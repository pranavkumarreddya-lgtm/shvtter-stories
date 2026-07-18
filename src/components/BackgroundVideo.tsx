import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * BackgroundVideo — Full-screen fixed background video with scroll-scrubbing.
 *
 * How scroll-scrubbing works:
 *   1. We calculate `scrollProgress` = scrollY / (documentHeight - viewportHeight) → [0, 1].
 *   2. We map that progress to the video's duration → targetTime = progress * video.duration.
 *   3. Inside a rAF loop we *lerp* the video's currentTime towards targetTime
 *      (time += (target - time) * ease) to keep motion buttery smooth.
 *   4. On mobile / low-power devices we skip the <video> entirely and show a
 *      static poster image to save battery.
 */

// Simple mobile / low-power heuristic
function isMobileOrLowPower(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  // Check for reduced-motion preference (accessibility / battery-saver)
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Check hardware concurrency as a rough proxy for low-power
  const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2;
  return isMobile || prefersReduced || lowCores;
}

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const [useFallback, setUseFallback] = useState(false);

  // Detect on mount whether we should fall back to poster
  useEffect(() => {
    setUseFallback(isMobileOrLowPower());
  }, []);

  /**
   * Scroll handler — lightweight: just updates a target number.
   * The heavy lifting (setting video.currentTime) happens inside the rAF loop.
   */
  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !isFinite(video.duration)) return;

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    // Clamp progress between 0 and 1
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    targetTimeRef.current = progress * video.duration;
  }, []);

  /**
   * rAF animation loop — lerps currentTime towards the scroll-derived target.
   * Using a lerp factor of 0.08 gives a cinematic, slow-glide feel.
   */
  const animate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && isFinite(video.duration)) {
      const ease = 0.08;
      const diff = targetTimeRef.current - currentTimeRef.current;

      // Only seek when the delta is meaningful (avoids micro-jitter)
      if (Math.abs(diff) > 0.01) {
        currentTimeRef.current += diff * ease;
        video.currentTime = currentTimeRef.current;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (useFallback) return;

    // Attach passive scroll listener (never blocks the main thread)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Kick-off the rAF loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [useFallback, handleScroll, animate]);

  // ── Fallback: static poster on mobile / low-power ──
  if (useFallback) {
    return (
      <div
        className="fixed inset-0 -z-10"
        aria-hidden="true"
        id="bg-video-fallback"
      >
        <img
          src={`${import.meta.env.BASE_URL}camera_poster.png`}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Very subtle overlay — just enough for white text legibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  // ── Desktop: scroll-scrubbing <video> ──
  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      id="bg-video-container"
    >
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}camera_exploded.mp4`}
        poster={`${import.meta.env.BASE_URL}camera_poster.png`}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        /* autoplay is intentionally omitted — we control playback via currentTime */
      />
      {/* Minimal overlay — keeps text readable without washing out the video */}
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
}

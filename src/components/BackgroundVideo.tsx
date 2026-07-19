import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * BackgroundVideo — Hero-only scroll-scrubbed background video.
 * Fades out and pauses once the user scrolls past the hero section.
 */

function isMobileOrLowPower(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2;
  return isMobile || prefersReduced || lowCores;
}

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const [useFallback, setUseFallback] = useState(false);

  // Track scroll progress for the entire page
  const { scrollY } = useScroll();

  // Fade out the video after the hero section (~100vh)
  // opacity: 1 at 0px, starts fading at 60vh, fully transparent at 100vh
  const videoOpacity = useTransform(scrollY, [0, window.innerHeight * 0.6, window.innerHeight], [1, 0.6, 0]);

  useEffect(() => {
    setUseFallback(isMobileOrLowPower());
  }, []);

  // Pause video when scrolled past hero
  useEffect(() => {
    const unsubscribe = videoOpacity.on('change', (latest) => {
      const video = videoRef.current;
      if (!video) return;
      if (latest <= 0.01) {
        video.pause();
      }
    });
    return () => unsubscribe();
  }, [videoOpacity]);

  // Scroll-scrub handler — only update target time
  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !isFinite(video.duration)) return;

    const scrollPos = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
    targetTimeRef.current = progress * video.duration;
  }, []);

  // rAF loop — lerp currentTime toward target
  const animate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && isFinite(video.duration)) {
      const ease = 0.08;
      const diff = targetTimeRef.current - currentTimeRef.current;
      if (Math.abs(diff) > 0.01) {
        currentTimeRef.current += diff * ease;
        video.currentTime = currentTimeRef.current;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (useFallback) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [useFallback, handleScroll, animate]);

  if (useFallback) {
    return (
      <motion.div
        style={{ opacity: videoOpacity }}
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        id="bg-video-fallback"
      >
        <img
          src={`${import.meta.env.BASE_URL}camera_poster.png`}
          alt="Exploded technical rendering of a classic SLR camera lens"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ opacity: videoOpacity }}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      id="bg-video-container"
    >
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}camera_exploded.mp4`}
        poster={`${import.meta.env.BASE_URL}camera_poster.png`}
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/15" />
    </motion.div>
  );
}

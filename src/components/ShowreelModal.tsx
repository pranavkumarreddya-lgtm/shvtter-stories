import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, SkipForward, Landmark, Globe, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  id: number;
  time: number; // in seconds
  title: string;
  icon: typeof Globe;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [activeChapter, setActiveChapter] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const duration = 180; // 3 minutes total showreel

  const chapters: Chapter[] = [
    { id: 1, time: 0, title: 'I. Arctic Fjords (Norway)', icon: Globe },
    { id: 2, time: 45, title: 'II. Sands of Namib (Africa)', icon: Sparkles },
    { id: 3, time: 95, title: 'III. Shinjuku Midnight (Tokyo)', icon: Landmark },
    { id: 4, time: 140, title: 'IV. Artisans of Florence (Italy)', icon: Sparkles },
  ];

  // Auto increment simulated playback time
  useEffect(() => {
    if (isOpen && isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          const nextTime = prev + 1;
          
          // Check if we entered a new chapter
          const matchingChapter = [...chapters]
            .reverse()
            .find(ch => nextTime >= ch.time);
          if (matchingChapter && matchingChapter.id !== activeChapter) {
            setActiveChapter(matchingChapter.id);
          }
          
          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, activeChapter]);

  // Format time (e.g. 75s -> "01:15")
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimelineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    
    const matchingChapter = [...chapters]
      .reverse()
      .find(ch => newTime >= ch.time);
    if (matchingChapter) {
      setActiveChapter(matchingChapter.id);
    }
  };

  const skipToChapter = (ch: Chapter) => {
    setCurrentTime(ch.time);
    setActiveChapter(ch.id);
    setIsPlaying(true);
  };

  const activeChapterData = chapters.find(ch => ch.id === activeChapter);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 select-none"
          id="showreel-modal-container"
        >
          {/* Inner Cinema Canvas */}
          <motion.div
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden flex flex-col md:grid md:grid-cols-12"
          >
            {/* Left Column: Simulated Screen (16:9 ratio style) */}
            <div className="md:col-span-8 bg-black relative aspect-video flex flex-col justify-between p-6 overflow-hidden">
              {/* Outer boundary guides */}
              <div className="absolute inset-4 border border-neutral-900/40 pointer-events-none rounded" />

              {/* Top info HUD */}
              <div className="flex justify-between items-center z-10 font-mono text-[10px] text-neutral-500">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-neutral-700'}`} />
                  <span>{isPlaying ? 'PLAYING CINEMATIC CUT' : 'PAUSED'}</span>
                </div>
                <span>1080P // 24FPS</span>
              </div>

              {/* Center Screen: Immersive Equalizer/Visualizer Simulation */}
              <div className="flex-grow flex flex-col items-center justify-center relative my-12">
                {/* Simulated Lens Aperture rings bouncing with audio */}
                <div className="absolute w-44 h-44 rounded-full border border-neutral-900 flex items-center justify-center">
                  <div className={`rounded-full border border-neutral-800 flex items-center justify-center transition-all duration-500 ${
                    isPlaying ? 'w-36 h-36 scale-105 border-gold-900/30' : 'w-32 h-32 scale-100'
                  }`}>
                    <div className="w-24 h-24 rounded-full border border-neutral-700/40 flex items-center justify-center">
                      <div className="text-center">
                        <span className="font-serif italic text-sm text-neutral-500 block">Chapter</span>
                        <span className="font-mono text-xs text-white font-bold">{activeChapter}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Audio Waves spectrum bars */}
                <div className="absolute bottom-0 inset-x-6 flex items-end justify-center space-x-1 h-14">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    // Generate pseudo random heights that bounce when isPlaying is true
                    const baseHeight = 10 + (idx % 4) * 8 + (idx % 3) * 6;
                    const randomDelta = isPlaying ? Math.sin((currentTime + idx) * 0.8) * 14 : 0;
                    const finalHeight = Math.max(4, baseHeight + randomDelta);
                    
                    return (
                      <div
                        key={idx}
                        style={{ height: `${finalHeight}px` }}
                        className={`w-1 rounded-t transition-all duration-300 ${
                          isPlaying ? 'bg-[#9c7a55]/60 group-hover:bg-gold-400' : 'bg-neutral-800'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Display Chapter title overlaid on center */}
                <div className="absolute top-0 text-center font-serif text-white tracking-wide">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold-400 uppercase block mb-1">CURRENT CHAPTER SCENE</span>
                  {activeChapterData?.title}
                </div>
              </div>

              {/* Video control UI bar overlay */}
              <div className="z-10 bg-neutral-950/90 backdrop-blur border border-neutral-900 p-4 rounded-lg space-y-3">
                {/* Timeline slider row */}
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-[10px] text-neutral-400">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleTimelineChange}
                    className="flex-grow h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                  />
                  <span className="font-mono text-[10px] text-neutral-500">{formatTime(duration)}</span>
                </div>

                {/* Control Action Buttons row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-4 text-neutral-400">
                    {/* Play/Pause */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white transition-colors p-1"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current text-white" /> : <Play className="w-4 h-4 fill-current text-white" />}
                    </button>

                    {/* Reset Timeline */}
                    <button
                      onClick={() => { setCurrentTime(0); setIsPlaying(true); }}
                      className="hover:text-white transition-colors p-1"
                      title="Rewind Showreel"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick Skip 10s */}
                    <button
                      onClick={() => setCurrentTime((p) => Math.min(p + 10, duration))}
                      className="hover:text-white transition-colors p-1"
                      title="Skip Forward 10s"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Volume Slider Block */}
                  <div className="flex items-center space-x-2 text-neutral-400">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white transition-colors p-1"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseInt(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Sidebar Details (Chapter selector, metadata) */}
            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-neutral-900 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase font-bold">CINEMATIC PROJECT</span>
                    <h3 className="font-serif text-lg text-white mt-1">Showreel cuts</h3>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="text-neutral-500 hover:text-white font-mono text-[11px]"
                  >
                    [ CLOSE ]
                  </button>
                </div>

                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light mb-6">
                  A compiled digital showreel highlighting focal depth transitions, slow tracking, and environmental atmosphere captures.
                </p>

                {/* Interactive Chapters List */}
                <div className="space-y-2.5">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 font-bold uppercase block mb-3">SCENE CHAPTER INDEX</span>
                  
                  {chapters.map((ch) => {
                    const isActive = activeChapter === ch.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => skipToChapter(ch)}
                        className={`w-full p-3 rounded-lg text-left flex items-center justify-between border transition-all duration-300 ${
                          isActive
                            ? 'bg-neutral-900/60 border-gold-800/40 text-white'
                            : 'bg-neutral-950 border-transparent text-neutral-400 hover:bg-neutral-900/30 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <ch.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-gold-400' : 'text-neutral-600'}`} />
                          <span className="font-sans text-[11px] font-medium truncate">{ch.title}</span>
                        </div>
                        <span className="font-mono text-[9px] text-neutral-600 ml-2">{formatTime(ch.time)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar bottom specifications */}
              <div className="pt-6 border-t border-neutral-900/80 mt-6 space-y-2 text-[10px] font-mono text-neutral-500">
                <div className="flex justify-between">
                  <span>CAMERA MODEL:</span>
                  <span className="text-white">SONY A7S III</span>
                </div>
                <div className="flex justify-between">
                  <span>RECORDING BITRATE:</span>
                  <span className="text-white">600MBPS XAVC S-I</span>
                </div>
                <div className="flex justify-between">
                  <span>COLOR PROFILE:</span>
                  <span className="text-white">S-LOG3 / S-GAMUT3</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

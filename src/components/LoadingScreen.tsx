import { motion, useReducedMotion } from 'motion/react';

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  x: ((index * 37) % 100) - 50,
  y: ((index * 59) % 100) - 50,
  size: index % 5 === 0 ? 3 : 1,
  delay: (index % 9) * 0.13,
}));

const blades = Array.from({ length: 8 }, (_, index) => index * 45);

export default function LoadingScreen() {
  const reduced = useReducedMotion();
  const duration = reduced ? 0.01 : 6.7;

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[100] isolate grid place-items-center overflow-hidden bg-[#020202]" aria-label="Shvtter Stories brand introduction" role="status">
      <motion.div animate={{ opacity: [0, 0.9, 0.5], scale: [0.65, 1.2, 1.55] }} transition={{ duration: duration, times: [0, .25, 1] }} className="absolute h-[90vmax] w-[90vmax] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,.18),transparent_38%)] blur-3xl" />
      <motion.div animate={{ opacity: [0, .55, .18], scale: [.6, 1, 1.25] }} transition={{ duration: duration, times: [0, .32, 1] }} className="absolute h-[54vmax] w-[54vmax] rounded-full border border-gold-400/20" />
      <div className="absolute inset-0" aria-hidden="true">
        {particles.map((particle) => <motion.i key={particle.id} initial={{ opacity: 0, x: particle.x * 5, y: particle.y * 5 }} animate={{ opacity: [0, .85, 0], x: [particle.x * 5, particle.x * 8, particle.x * 11], y: [particle.y * 5, particle.y * 7 - 30, particle.y * 10 - 80] }} transition={{ duration: 3.2, delay: particle.delay + .3, ease: 'easeOut' }} className="absolute left-1/2 top-1/2 rounded-full bg-gold-200 shadow-[0_0_12px_2px_rgba(212,175,55,.6)]" style={{ width: particle.size, height: particle.size }} />)}
      </div>
      <div className="relative flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: .45, rotate: -25 }} animate={{ opacity: [0, 1, 1], scale: [.45, 1, 1], rotate: [-25, 0, 0] }} transition={{ duration: 2.1, times: [0, .75, 1], ease: [0.16, 1, 0.3, 1] }} className="relative grid h-36 w-36 place-items-center sm:h-44 sm:w-44">
          <motion.div animate={{ rotate: reduced ? 0 : 360 }} transition={{ duration: 16, ease: 'linear', repeat: Infinity }} className="absolute inset-0 rounded-full border border-dashed border-gold-400/50" />
          <div className="absolute inset-3 rounded-full border border-gold-400/35 bg-black/30 backdrop-blur-sm" />
          {blades.map((angle, index) => <motion.span key={angle} initial={{ opacity: 0, rotate: angle - 36, scaleX: .1 }} animate={{ opacity: 1, rotate: angle, scaleX: 1 }} transition={{ delay: .38 + index * .075, type: 'spring', stiffness: 120, damping: 17 }} className="absolute h-11 w-4 origin-bottom rounded-t-full bg-gradient-to-t from-gold-700 via-gold-400 to-gold-100 shadow-[0_0_16px_rgba(212,175,55,.35)]" style={{ transformOrigin: '50% 100%', top: '17px' }} />)}
          <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.18, 1] }} transition={{ delay: 1.25, type: 'spring', stiffness: 210, damping: 15 }} className="relative z-10 h-11 w-11 rounded-full border border-gold-100/70 bg-black shadow-[0_0_35px_rgba(212,175,55,.8)]" />
          <motion.div initial={{ x: '-160%', opacity: 0 }} animate={{ x: ['-160%', '160%'], opacity: [0, 1, 0] }} transition={{ duration: .9, delay: 2, ease: 'easeInOut' }} className="absolute z-20 h-[2px] w-44 rotate-[-28deg] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 18, letterSpacing: '0.12em' }} animate={{ opacity: [0, 0, 1], y: [18, 18, 0], letterSpacing: ['.12em', '.12em', '.42em'] }} transition={{ duration: 3.5, times: [0, .62, 1], delay: .2, ease: [0.16, 1, .3, 1] }} className="mt-8 pl-[.42em] font-sans text-2xl font-semibold text-white sm:text-3xl">SHVTTER</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0, 0, 1], y: [10, 10, 0] }} transition={{ duration: 3.4, times: [0, .72, 1], delay: .2 }} className="mt-3 font-mono text-[9px] tracking-[.52em] text-gold-400">STORIES</motion.p>
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 0, 1], opacity: [0, 0, 1] }} transition={{ duration: 3.9, times: [0, .72, 1], delay: .2 }} className="mt-6 h-px w-28 origin-center bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }} transition={{ duration: 4.7, times: [0, .8, 1], delay: .2 }} className="mt-5 text-center font-serif text-base italic text-white/65">Where light becomes a memory</motion.p>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: [0, .72, 1] }} transition={{ duration: duration, times: [0, .16, 1], ease: 'linear' }} className="absolute bottom-0 left-0 h-[2px] origin-left bg-gold-400" />
    </motion.div>
  );
}

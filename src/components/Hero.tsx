import { motion } from 'motion/react';
import { Play, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onWatchShowreel: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({ 
  onWatchShowreel, 
  onViewPortfolio 
}: HeroProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 18 
      } 
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-black"
    >
      <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: 'easeOut' }} src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2200&q=90" alt="Photographer working in a studio" className="absolute inset-0 h-full w-full object-cover opacity-55" fetchPriority="high" decoding="async" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,.94),rgba(0,0,0,.5)_58%,rgba(0,0,0,.25))]" />
      {/* Decorative vertical guiding lines for professional grid detail */}
      <div className="absolute top-0 left-6 md:left-12 bottom-0 w-[1px] bg-neutral-900/30 pointer-events-none" />
      <div className="absolute top-0 right-6 md:right-12 bottom-0 w-[1px] bg-neutral-900/30 pointer-events-none" />

      {/* Cinematic Centerpiece Splash Logo */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 flex max-w-4xl flex-col items-center text-center space-y-7"
      >
        {/* Animated Camera Aperture Logo Motif */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-36 h-36 flex items-center justify-center select-none"
        >
          {/* Outer rotating focus ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-gold-500/40"
          />
          {/* Inner solid gold-trimmed chamber */}
          <div className="absolute inset-4 rounded-full border-2 border-gold-500/20 bg-neutral-950/60 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-gold-950/20">
            {/* The Lens element */}
            <div className="w-16 h-16 rounded-full border border-gold-400/40 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600/30 to-violet-900/40 border border-gold-400/60 flex items-center justify-center shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-gold-400 shadow-md shadow-gold-500/50" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Studio Branding */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="eyebrow text-gold-400">Shvtter Stories / Est. 2016</p>
          <h1 className="mt-4 font-serif text-5xl leading-[.9] text-white sm:text-7xl md:text-8xl">
            Capturing moments<br />that <em className="text-gold-400">last forever.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/75">Wedding · Portrait · Events · Commercial Photography</p>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Minimal play showreel handle */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 sm:flex-row">
          <motion.button onClick={onViewPortfolio} whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-[11px] font-bold tracking-[.14em] text-black">EXPLORE PORTFOLIO <ArrowRight className="h-4 w-4" /></motion.button>
          <motion.button
            onClick={onWatchShowreel}
            whileHover={{ scale: 1.05, borderColor: '#be9570', backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2.5 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-950/40 backdrop-blur-sm text-neutral-400 hover:text-white transition-all duration-300 font-sans text-[10px] tracking-[0.2em] font-semibold uppercase cursor-pointer"
          >
            <Play className="w-3 h-3 text-gold-400 fill-gold-400" />
          <span>PLAY SHOWREEL</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 z-10 flex flex-col items-center space-y-1.5 cursor-pointer text-neutral-500 hover:text-white transition-colors select-none"
        onClick={onViewPortfolio}
      >
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase">EXPLORE WORK</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

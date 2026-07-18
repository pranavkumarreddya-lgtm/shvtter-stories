import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Play } from 'lucide-react';
import { CategoryType } from '../types';

interface HeroProps {
  selectedFilter: CategoryType;
  onFilterChange: (category: CategoryType) => void;
  onWatchShowreel: () => void;
  onViewPortfolio: () => void;
}

export default function Hero({ 
  selectedFilter, 
  onFilterChange, 
  onWatchShowreel, 
  onViewPortfolio 
}: HeroProps) {
  
  const filterTabs: { label: string; value: CategoryType }[] = [
    { label: 'ALL', value: 'ALL' },
    { label: 'LANDSCAPE', value: 'LANDSCAPE' },
    { label: 'PORTRAIT', value: 'PORTRAIT' },
    { label: 'WILDLIFE', value: 'WILDLIFE' },
    { label: 'TRAVEL', value: 'TRAVEL' },
    { label: 'STREET', value: 'STREET' },
    { label: 'COMMERCIAL', value: 'COMMERCIAL' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 90, 
        damping: 18, 
        mass: 0.8 
      } 
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-black/25"
    >
      {/* Absolute top grid subtle details (not background animation, just structural wireframe guides to make it feel premium) */}
      <div className="absolute top-0 left-6 md:left-12 bottom-0 w-[1px] bg-neutral-900/40 pointer-events-none" />
      <div className="absolute top-0 right-6 md:right-12 bottom-0 w-[1px] bg-neutral-900/40 pointer-events-none" />

      {/* Hero Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-grow flex flex-col justify-center max-w-4xl z-10 my-auto"
      >
        <motion.div variants={itemVariants}>
          {/* Accent golden label */}
          <span className="font-mono text-[10px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
            CAPTURING MOMENTS
          </span>
        </motion.div>

        {/* Large Display Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl md:text-8xl font-light text-white leading-[1.1] tracking-tight mt-6 select-none"
        >
          Stories Through <br />
          <span className="italic font-normal">My Lens</span>
        </motion.h1>

        {/* Short, elegant description */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-[13px] md:text-[15px] leading-relaxed text-neutral-400 font-light max-w-md mt-6"
        >
          Professional photography services for people, places and moments that matter.
        </motion.p>

        {/* Hero Interactive Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-6 items-center mt-10"
        >
          {/* Filled brown portfolio button */}
          <motion.button
            onClick={onViewPortfolio}
            whileHover={{ scale: 1.03, backgroundColor: '#a97c55', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-[#9c7a55] text-white font-sans text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-lg shadow-black/30 cursor-pointer"
            id="hero-view-portfolio-btn"
          >
            VIEW PORTFOLIO
          </motion.button>

          {/* Outline showreel play button */}
          <motion.button
            onClick={onWatchShowreel}
            className="flex items-center space-x-3.5 py-2 group select-none cursor-pointer"
            id="hero-watch-showreel-btn"
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              whileHover={{ scale: 1.08, borderColor: '#be9570', backgroundColor: 'rgba(190, 149, 112, 0.1)' }}
              className="w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center transition-all duration-300"
            >
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5 group-hover:text-gold-300 group-hover:fill-gold-300 transition-colors" />
            </motion.div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-neutral-400 group-hover:text-white transition-colors uppercase">
              WATCH SHOWREEL
            </span>
          </motion.button>
        </motion.div>

        {/* Social Icons Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-6 mt-14 text-neutral-500"
          id="hero-socials"
        >
          <motion.a
            whileHover={{ scale: 1.25, y: -2, color: '#be9570' }}
            transition={{ type: 'spring', stiffness: 350, damping: 10 }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-400 transition-colors duration-300"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25, y: -2, color: '#be9570' }}
            transition={{ type: 'spring', stiffness: 350, damping: 10 }}
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-400 transition-colors duration-300"
            aria-label="Facebook Profile"
          >
            <Facebook className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.25, y: -2, color: '#be9570' }}
            transition={{ type: 'spring', stiffness: 350, damping: 10 }}
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-400 transition-colors duration-300"
            aria-label="Twitter Profile"
          >
            <Twitter className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.15, y: -2, color: '#be9570' }}
            transition={{ type: 'spring', stiffness: 350, damping: 10 }}
            href="https://500px.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-400 font-mono text-[11px] tracking-[0.1em] font-bold transition-colors duration-300"
            aria-label="500px Profile"
          >
            500px
          </motion.a>
        </motion.div>
      </motion.div>

      {/* BOTTOM SECTION: Interactive Navigation Tabs (as shown exactly at the bottom of the photo) */}
      <div className="w-full border-t border-neutral-900/60 pt-8 mt-12 z-10" id="filter-tabs-container">
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth items-center space-x-8 md:space-x-12 pb-2">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onFilterChange(tab.value)}
                className="relative text-[10px] md:text-[11px] font-medium tracking-[0.25em] text-neutral-400 hover:text-white transition-colors duration-300 pb-3 whitespace-nowrap uppercase select-none cursor-pointer"
                id={`filter-tab-${tab.value}`}
              >
                {tab.label}
                {isSelected && (
                  <motion.div
                    layoutId="selectedFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-200"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Camera, Sparkles, Sliders } from 'lucide-react';
import { portfolioItems } from '../data';
import { CategoryType, PortfolioItem } from '../types';

interface PortfolioProps {
  selectedFilter: CategoryType;
  onFilterChange: (category: CategoryType) => void;
}

export default function Portfolio({ selectedFilter, onFilterChange }: PortfolioProps) {
  // Shutter flash state per item ID
  const [flashedItemId, setFlashedItemId] = useState<string | null>(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState<PortfolioItem | null>(null);

  // Filter items based on selected category
  const filteredItems = portfolioItems.filter(
    (item) => selectedFilter === 'ALL' || item.category === selectedFilter
  );

  // Handle a mockup shutter release trigger!
  const triggerShutterFlash = (id: string) => {
    setFlashedItemId(id);
    setTimeout(() => {
      setFlashedItemId(null);
    }, 300);
  };

  const categories: CategoryType[] = [
    'ALL',
    'LANDSCAPE',
    'PORTRAIT',
    'WILDLIFE',
    'TRAVEL',
    'STREET',
    'COMMERCIAL',
  ];

  const portfolioContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const portfolioItemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 85, 
        damping: 16 
      } 
    }
  };

  const modalContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05
      }
    }
  };

  const modalItemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 110, 
        damping: 18 
      } 
    }
  };

  return (
    <section 
      id="portfolio" 
      className="py-24 px-6 md:px-12 lg:px-24 bg-black/30 border-t border-neutral-900/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
              GALLERY INDEX
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-3">
              Stories Catalog
            </h2>
          </div>
          <p className="font-sans text-xs text-neutral-500 max-w-xs mt-4 md:mt-0 leading-relaxed font-light">
            Each entry is a documented fragment of reality. Click on a viewfinder card to trigger a simulated exposure capture.
          </p>
        </motion.div>

        {/* Section Filtering Tabs on Portfolio page too, for deep interaction */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12" 
          id="portfolio-sub-filters"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`relative px-4 py-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-white text-black border-white font-bold'
                  : 'text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Dynamic Grid */}
        <motion.div 
          layout
          variants={portfolioContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="portfolio-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isFlashed = flashedItemId === item.id;
              
              return (
                <motion.article
                  layout
                  variants={portfolioItemVariants}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                  key={item.id}
                  className="group bg-neutral-950/80 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                  id={`portfolio-card-${item.id}`}
                >
                  {/* Viewfinder Graphic (Visual Placeholder) */}
                  <div 
                    onClick={() => {
                      triggerShutterFlash(item.id);
                      setSelectedItemDetail(item);
                    }}
                    className="aspect-[3/2] w-full bg-neutral-900/30 relative flex flex-col justify-between p-4 cursor-pointer overflow-hidden border-b border-neutral-900 select-none"
                  >
                    {/* Corner Viewfinder Brackets */}
                    <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-neutral-700 group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300" />
                    <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-neutral-700 group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300" />
                    <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-neutral-700 group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300" />
                    <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-neutral-700 group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300" />

                    {/* Rule of Thirds subtle lines */}
                    <div className="absolute inset-x-0 top-1/3 h-[1px] bg-neutral-950/20 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-1/3 h-[1px] bg-neutral-950/20 pointer-events-none" />
                    <div className="absolute left-1/3 inset-y-0 w-[1px] bg-neutral-950/20 pointer-events-none" />
                    <div className="absolute right-1/3 inset-y-0 w-[1px] bg-neutral-950/20 pointer-events-none" />

                    {/* Central Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                      <div className="w-4 h-[1px] bg-neutral-700 group-hover:bg-gold-500/50 transition-colors" />
                      <div className="h-4 w-[1px] bg-neutral-700 group-hover:bg-gold-500/50 absolute transition-colors" />
                      <div className="w-1.5 h-1.5 rounded-full border border-neutral-700 group-hover:border-gold-500/50 absolute" />
                    </div>

                    {/* Top HUD Row */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9c7a55] animate-pulse" />
                        <span>LIVE</span>
                      </div>
                      <div className="tracking-widest">
                        {item.category}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>ISO {item.specs.iso}</span>
                      </div>
                    </div>

                    {/* Big focal length display in background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                      <span className="font-serif italic text-6xl text-neutral-900/15 group-hover:text-neutral-900/30 group-hover:scale-110 transition-all duration-500">
                        {item.specs.focalLength}
                      </span>
                    </div>

                    {/* Bottom HUD Row */}
                    <div className="flex justify-between items-end text-[9px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      <div>RAW 3:2</div>
                      <div className="text-[10px] font-semibold text-white tracking-widest">{item.specs.shutter}</div>
                      <div>{item.specs.aperture}</div>
                    </div>

                    {/* Shutter Release White Flash Layer */}
                    <AnimatePresence>
                      {isFlashed && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0 bg-white z-20 flex items-center justify-center"
                        >
                          <span className="font-mono text-xs font-bold tracking-widest text-black">
                            EXPOSURE +0.0EV
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Details Block */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gold-400" />
                          <span>{item.location}</span>
                        </div>
                        <span>{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-normal text-white group-hover:text-gold-300 transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-sans text-[12px] leading-relaxed text-neutral-400 font-light mt-4 line-clamp-2">
                        {item.story}
                      </p>
                    </div>

                    {/* Footer Specifications Info */}
                    <div className="border-t border-neutral-900/80 pt-4 mt-6">
                      <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[10px] font-mono text-neutral-500">
                        <div className="flex items-center space-x-1">
                          <Camera className="w-3 h-3 text-neutral-600" />
                          <span className="truncate">{item.specs.camera}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Sliders className="w-3 h-3 text-neutral-600" />
                          <span className="truncate">{item.specs.lens}</span>
                        </div>
                      </div>
                      
                      {/* Interaction trigger link */}
                      <button 
                        onClick={() => setSelectedItemDetail(item)}
                        className="w-full mt-4 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-white transition-colors py-2 border border-neutral-900 hover:border-neutral-800 bg-neutral-950 uppercase font-semibold cursor-pointer"
                      >
                        READ FULL CASE STORY
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Case Story Detail Slide-over Modal */}
        <AnimatePresence>
          {selectedItemDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/92 backdrop-blur-md z-50 flex items-center justify-center p-4"
              id="portfolio-case-story-modal"
            >
              <motion.div
                initial={{ scale: 0.96, y: 25, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 25, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-neutral-950 border border-neutral-800 rounded-xl max-w-2xl w-full p-8 relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItemDetail(null)}
                  className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors text-xs font-mono tracking-widest cursor-pointer"
                >
                  [ CLOSE ]
                </button>

                <motion.div 
                  variants={modalContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col"
                >
                  {/* Category & Location */}
                  <motion.span 
                    variants={modalItemVariants}
                    className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase"
                  >
                    {selectedItemDetail.category} // {selectedItemDetail.location}
                  </motion.span>

                  {/* Title */}
                  <motion.h3 
                    variants={modalItemVariants}
                    className="font-serif text-3xl md:text-4xl font-normal text-white mt-4"
                  >
                    {selectedItemDetail.title}
                  </motion.h3>

                  {/* Date */}
                  <motion.span 
                    variants={modalItemVariants}
                    className="font-mono text-xs text-neutral-500 mt-2"
                  >
                    Captured in {selectedItemDetail.date}
                  </motion.span>

                  {/* Big Viewfinder details in modal */}
                  <motion.div 
                    variants={modalItemVariants}
                    className="border border-neutral-900 bg-neutral-900/10 p-5 rounded-lg my-6 flex flex-wrap gap-x-6 gap-y-3 justify-between items-center text-xs font-mono text-neutral-400"
                  >
                    <div>
                      <span className="text-neutral-600 block text-[9px] uppercase tracking-wider mb-0.5">CAMERA</span>
                      <span className="text-neutral-200 font-sans">{selectedItemDetail.specs.camera}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[9px] uppercase tracking-wider mb-0.5">LENS</span>
                      <span className="text-neutral-200 font-sans">{selectedItemDetail.specs.lens}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[9px] uppercase tracking-wider mb-0.5">SHUTTER</span>
                      <span className="text-white font-semibold">{selectedItemDetail.specs.shutter}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[9px] uppercase tracking-wider mb-0.5">APERTURE</span>
                      <span className="text-white font-semibold">{selectedItemDetail.specs.aperture}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[9px] uppercase tracking-wider mb-0.5">ISO</span>
                      <span className="text-white font-semibold">{selectedItemDetail.specs.iso}</span>
                    </div>
                  </motion.div>

                  {/* Story Text */}
                  <motion.h4 
                    variants={modalItemVariants}
                    className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase border-b border-neutral-900 pb-2 mb-3 flex items-center"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
                    THE BEHIND-THE-SCENES STORY
                  </motion.h4>
                  
                  <motion.p 
                    variants={modalItemVariants}
                    className="font-sans text-[13px] leading-relaxed text-neutral-300 font-light"
                  >
                    {selectedItemDetail.story}
                  </motion.p>
                  
                  <motion.p 
                    variants={modalItemVariants}
                    className="font-sans text-[13px] leading-relaxed text-neutral-400 font-light mt-3"
                  >
                    Capturing high-end art relies heavily on anticipating the interaction of light, environment, and geometry. This shot represents a patient wait of several hours for the perfect meteorological window where shadows and mist created a natural separation, requiring zero composite editing or artificial alterations.
                  </motion.p>

                  {/* Actions */}
                  <motion.div 
                    variants={modalItemVariants}
                    className="flex gap-4 mt-8 pt-6 border-t border-neutral-900"
                  >
                    <button
                      onClick={() => {
                        triggerShutterFlash(selectedItemDetail.id);
                        setTimeout(() => setSelectedItemDetail(null), 400);
                      }}
                      className="flex-1 py-3 bg-[#9c7a55] hover:bg-[#a97c55] text-white text-[10px] tracking-[0.25em] font-semibold uppercase transition-colors cursor-pointer"
                    >
                      TRIGGER RE-EXPOSURE FLASH
                    </button>
                    <button
                      onClick={() => setSelectedItemDetail(null)}
                      className="px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-[10px] tracking-[0.25em] font-semibold uppercase transition-colors cursor-pointer"
                    >
                      DISMISS
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

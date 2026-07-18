import { motion } from 'motion/react';
import { Shield, Hammer, Feather, Award } from 'lucide-react';
import { gearInventory } from '../data';

export default function About() {
  const highlights = [
    {
      icon: Feather,
      title: 'Minimalist Focus',
      desc: 'Removing ambient visual clutter to prioritize the emotional weight and raw structure of the focal subject.',
    },
    {
      icon: Hammer,
      title: 'Surgical Precision',
      desc: 'Meticulous control over lighting setups, exposure calculations, and lens calibrations to ensure printing grade fidelity.',
    },
    {
      icon: Shield,
      title: 'Ethical Candid',
      desc: 'Operating with transparency and absolute respect for human dignity across all street and cultural photography projects.',
    },
    {
      icon: Award,
      title: 'Fine-Art Quality',
      desc: 'Crafting high-resolution museum grade prints with precise tonal ranges, deep contrast profiles, and physical durability.',
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 85, 
        damping: 15 
      } 
    }
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-black/30 border-t border-neutral-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 grid grid-cols-2 divide-x divide-y divide-white/10 border border-white/10 bg-white/[.04] md:grid-cols-4 md:divide-y-0">
          {[['500+', 'Happy clients'], ['150+', 'Weddings'], ['10+', 'Years experience'], ['100%', 'Client satisfaction']].map(([value, label]) => <div key={label} className="p-6 text-center md:p-8"><p className="font-serif text-4xl text-gold-400">{value}</p><p className="mt-2 text-[10px] font-mono uppercase tracking-[.16em] text-neutral-400">{label}</p></div>)}
        </motion.div>
        {/* About Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20"
        >
          <div className="lg:col-span-5">
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
              BIOGRAPHY & PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-3 leading-tight">
              Honoring the Silent Moments
            </h2>
          </div>
          <div className="lg:col-span-7 font-sans font-light text-neutral-400 space-y-6 text-[13px] md:text-[14px] leading-relaxed">
            <p>
              I am a visual storyteller specializing in travel, portraiture, and high-precision commercial photography. For over a decade, I have traveled across continents—from the sub-zero arctic fjords of Norway to the neon-drenched alleys of Tokyo—seeking the unspoken narratives that lie within our environments.
            </p>
            <p>
              My approach is fundamentally minimalist. By omitting excess noise, background animations, or superficial embellishments, I seek to let the true story of the frame breathe. It is not simply about capturing what is there; it is about conveying the heavy atmosphere, the sudden shifts in light, and the raw humanity of the instant.
            </p>
            <p className="border-l-2 border-gold-500 pl-4 text-gold-200 italic font-serif text-base font-normal my-6">
              "A photograph is not an active creation; it is a quiet agreement between light, time, and observation."
            </p>
          </div>
        </motion.div>

        {/* Highlight Pillars */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24" 
          id="about-highlights-grid"
        >
          {highlights.map((hl, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                borderColor: '#be9570',
                backgroundColor: 'rgba(13, 13, 13, 0.95)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
              }}
              className="p-6 bg-neutral-950 border border-neutral-900 transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div>
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gold-400 mb-6 group-hover:border-gold-500 group-hover:text-gold-300 transition-colors duration-300"
                >
                  <hl.icon className="w-4 h-4" />
                </motion.div>
                <h3 className="font-serif text-lg font-normal text-white mb-3 group-hover:text-gold-300 transition-colors">{hl.title}</h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">{hl.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Gear Bag Section (Fully typography based, premium feel) */}
        <div className="border-t border-neutral-900 pt-16" id="about-gear-bag">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
                THE HARDWARE
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-white mt-2">
                The Gear Bag
              </h3>
            </div>
            <p className="font-sans text-xs text-neutral-500 max-w-xs mt-4 md:mt-0 font-light leading-relaxed">
              Meticulously maintained and selected professional tools chosen to extract maximum technical fidelity.
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* Categorized gear items list */}
            {['Camera Bodies', 'Prime Lenses', 'Zoom Lenses'].map((catName) => {
              const catGear = gearInventory.filter(item => item.category === catName);
              return (
                <motion.div 
                  key={catName} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-neutral-900"
                >
                  <div className="md:col-span-3">
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-bold">
                      {catName}
                    </span>
                  </div>
                  <div className="md:col-span-9 space-y-4">
                    {catGear.map((gear, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-l border-transparent hover:border-gold-500/50 pl-0 hover:pl-3 transition-all duration-300"
                      >
                        <span className="font-sans text-[13px] font-medium text-white transition-colors">{gear.model}</span>
                        <span className="font-sans text-[11px] text-neutral-400 font-light max-w-md sm:text-right">
                          {gear.purpose}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

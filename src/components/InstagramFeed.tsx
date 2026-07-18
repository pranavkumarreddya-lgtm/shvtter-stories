import { motion } from 'motion/react';
import { Instagram, ExternalLink } from 'lucide-react';

// Simulated Instagram-style feed with gradient placeholders
const feedItems = [
  { id: 'ig-1', gradient: 'from-amber-900/60 to-neutral-900', label: 'Golden Hour' },
  { id: 'ig-2', gradient: 'from-sky-900/60 to-neutral-900', label: 'Mountain Fog' },
  { id: 'ig-3', gradient: 'from-rose-900/60 to-neutral-900', label: 'Studio Portrait' },
  { id: 'ig-4', gradient: 'from-emerald-900/60 to-neutral-900', label: 'Forest Trail' },
  { id: 'ig-5', gradient: 'from-violet-900/60 to-neutral-900', label: 'City Nights' },
  { id: 'ig-6', gradient: 'from-orange-900/60 to-neutral-900', label: 'Desert Dunes' },
  { id: 'ig-7', gradient: 'from-cyan-900/60 to-neutral-900', label: 'Ocean Calm' },
  { id: 'ig-8', gradient: 'from-pink-900/60 to-neutral-900', label: 'Wedding Day' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 18 } }
};

export default function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
              FOLLOW THE JOURNEY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white mt-2">
              @shvtterstories
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-gold-400 transition-colors uppercase cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            FOLLOW ON INSTAGRAM
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2"
        >
          {feedItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.25 } }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            >
              <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase text-center px-2">
                  {item.label}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

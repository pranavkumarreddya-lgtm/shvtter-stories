import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { servicePackages } from '../data';

const sectionVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } }
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[9px] tracking-[0.35em] text-gold-400 font-semibold uppercase">
            SERVICES & PACKAGES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-3 leading-tight">
            Investment Tiers
          </h2>
          <p className="font-sans text-xs text-neutral-400 font-light mt-4 max-w-lg mx-auto leading-relaxed">
            Curated photography packages designed for every occasion — from intimate portraits to grand commercial campaigns.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicePackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className={`relative rounded-xl border p-6 flex flex-col ${
                pkg.highlighted
                  ? 'border-gold-600 bg-gradient-to-b from-gold-950/20 to-neutral-950'
                  : 'border-neutral-900 bg-neutral-950'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-gold-600 rounded-full">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase">MOST POPULAR</span>
                </div>
              )}
              <div className="mb-4 pt-2">
                <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">{pkg.subtitle}</span>
                <h3 className="font-serif text-xl text-white font-normal mt-1">{pkg.title}</h3>
              </div>
              <div className="mb-6">
                <span className={`font-serif text-3xl font-light ${pkg.highlighted ? 'text-gold-400' : 'text-white'}`}>
                  {pkg.price}
                </span>
              </div>
              <ul className="space-y-3 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[11px] text-neutral-400 font-light">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-gold-400' : 'text-neutral-600'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-6 w-full py-3 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  pkg.highlighted
                    ? 'bg-gold-600 hover:bg-gold-500 text-white'
                    : 'border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white'
                }`}
              >
                BOOK NOW
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

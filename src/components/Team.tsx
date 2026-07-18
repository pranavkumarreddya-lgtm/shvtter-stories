import { motion } from 'motion/react';
import { Camera, MapPin } from 'lucide-react';
import { teamMembers } from '../data';

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const memberVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } }
};

// Generate initials from name
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('');
}

export default function Team() {
  return (
    <section id="team" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-neutral-900/50">
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
            THE CREATIVE TEAM
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-3 leading-tight">
            Meet the Photographers
          </h2>
          <p className="font-sans text-xs text-neutral-400 font-light mt-4 max-w-lg mx-auto leading-relaxed">
            A collective of visual storytellers, each bringing their unique perspective and decades of combined expertise.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={memberVariants}
              className="group relative rounded-xl border border-neutral-900 bg-neutral-950 p-6 text-center overflow-hidden"
            >
              {/* Avatar with initials */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-5 group-hover:border-gold-600 transition-colors duration-500">
                <span className="font-serif text-xl text-neutral-500 group-hover:text-gold-400 transition-colors duration-500">
                  {getInitials(member.name)}
                </span>
              </div>

              <h3 className="font-serif text-lg text-white font-normal">{member.name}</h3>
              <p className="font-mono text-[9px] tracking-widest text-gold-400 uppercase mt-1">{member.role}</p>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-neutral-500">
                <Camera className="w-3 h-3" />
                <span className="text-[10px] font-mono">{member.specialty}</span>
              </div>

              {/* Bio on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <div className="text-center">
                  <MapPin className="w-4 h-4 text-gold-400 mx-auto mb-3" />
                  <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { ArrowUpRight, Award, Camera, MapPin } from 'lucide-react';
import { teamMembers } from '../data';

const grid = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const card = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-[#10152a] px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
          <div>
            <span className="eyebrow">The artists behind the frame</span>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[.95] text-white md:text-6xl">Different eyes. <em className="text-[#f3aa72]">One exacting standard.</em></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">Meet the photographers trusted for unrepeatable celebrations, intimate portraits, and campaigns that need to feel unmistakably human.</p>
        </div>

        <motion.div variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <motion.article variants={card} key={member.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171d35] shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={member.image} alt={`Portrait of ${member.name}`} className="h-full w-full object-cover grayscale-[18%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10152a] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold tracking-[.16em] text-white backdrop-blur">{member.experience}</span>
                  <ArrowUpRight className="h-5 w-5 text-[#f3aa72] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#f3aa72]">{member.role}</p>
                <h3 className="mt-2 font-serif text-2xl text-white">{member.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{member.bio}</p>
                <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                  <p className="flex gap-2"><Camera className="h-4 w-4 shrink-0 text-[#f3aa72]" />{member.specialty}</p>
                  <p className="flex gap-2"><Award className="h-4 w-4 shrink-0 text-[#f3aa72]" />{member.awards}</p>
                  <p className="flex gap-2 text-white"><MapPin className="h-4 w-4 shrink-0 text-[#f3aa72]" />Best known for: {member.featuredWork}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

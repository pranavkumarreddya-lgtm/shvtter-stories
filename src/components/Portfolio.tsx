import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Camera, X } from 'lucide-react';
import { portfolioItems } from '../data';
import { CategoryType, PortfolioItem } from '../types';

interface PortfolioProps { selectedFilter: CategoryType; onFilterChange: (category: CategoryType) => void; }
const categories: CategoryType[] = ['ALL', 'LANDSCAPE', 'PORTRAIT', 'WILDLIFE', 'TRAVEL', 'STREET', 'COMMERCIAL'];

export default function Portfolio({ selectedFilter, onFilterChange }: PortfolioProps) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const items = portfolioItems.filter((item) => selectedFilter === 'ALL' || item.category === selectedFilter);
  return <section id="portfolio" className="bg-[#f6f2eb] px-6 py-24 text-[#141527] md:px-12 lg:px-24">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div><span className="eyebrow text-[#a64b31]">Selected work / 2024—26</span><h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">Frames that<br /><em>stay with you.</em></h2></div>
        <p className="max-w-sm text-sm leading-7 text-[#53546a]">A living edit of photographs made with patience, instinct, and a little room for the unexpected.</p>
      </div>
      <div className="mb-10 flex flex-wrap gap-2">{categories.map((category) => <button key={category} onClick={() => onFilterChange(category)} className={`rounded-full px-4 py-2 text-[11px] font-bold tracking-[.1em] transition ${selectedFilter === category ? 'bg-[#141527] text-white' : 'border border-[#141527]/15 text-[#53546a] hover:border-[#a64b31] hover:text-[#a64b31]'}`}>{category}</button>)}</div>
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">{items.map((item, index) => <motion.button layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }} onClick={() => setSelected(item)} key={item.id} className={`group relative min-h-80 overflow-hidden text-left ${index % 5 === 0 ? 'sm:col-span-2 sm:min-h-[440px]' : ''}`}>
          <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141527]/90 via-[#141527]/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white"><div><p className="mb-2 text-[10px] font-bold tracking-[.18em] text-[#f4b17e]">{item.category} · {item.photographer}</p><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-1 text-xs text-white/70">{item.location}</p></div><span className="rounded-full border border-white/30 p-2"><ArrowUpRight className="h-4 w-4" /></span></div>
        </motion.button>)}</AnimatePresence>
      </motion.div>
    </div>
    <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-[#0b0d1b]/85 p-5 backdrop-blur-md" onClick={() => setSelected(null)}><motion.article initial={{ y: 24, scale: .97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: .97 }} onClick={(e) => e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-[#f6f2eb] md:grid-cols-2"><img src={selected.image} alt={selected.title} className="h-72 w-full object-cover md:h-full" /><div className="p-8"><button aria-label="Close case story" onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-[#141527] p-2 text-white"><X className="h-4 w-4" /></button><span className="eyebrow text-[#a64b31]">{selected.category} / {selected.date}</span><h3 className="mt-4 font-serif text-4xl">{selected.title}</h3><p className="mt-5 text-sm leading-7 text-[#53546a]">{selected.story}</p><div className="mt-8 border-t border-[#141527]/10 pt-5 text-xs leading-6 text-[#53546a]"><p className="font-bold text-[#141527]">Captured by {selected.photographer}</p><p>{selected.specs.camera} · {selected.specs.lens}</p><p>{selected.specs.focalLength} · {selected.specs.aperture} · {selected.specs.shutter} · ISO {selected.specs.iso}</p></div></div></motion.article></motion.div>}</AnimatePresence>
  </section>;
}

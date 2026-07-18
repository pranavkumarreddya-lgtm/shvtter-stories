import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    onNavigate('home');
  };

  return (
    <footer className="bg-black/30 border-t border-neutral-900/50 px-6 py-12 md:px-12 lg:px-24 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        
        {/* Left Side: Logo & Minimal Bio */}
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center cursor-pointer select-none" onClick={() => onNavigate('home')}>
            {/* Custom Logo element */}
            <div className="relative w-8 h-8 border border-neutral-800 rounded flex items-center justify-center mr-2.5">
              <div className="w-3.5 h-3.5 rounded-full border border-neutral-700 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-neutral-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-[0.2em] text-[12px] text-white">SHVTTER</span>
              <span className="font-mono text-[8px] tracking-[0.4em] text-gold-400">STORIES</span>
            </div>
          </div>
          <p className="font-sans text-[11px] text-neutral-500 font-light leading-relaxed">
            Professional photography documenting raw, authentic human records, environmental atmospheres, and minimalist editorial projects around the globe.
          </p>
        </div>

        {/* Center: Footlinks Navigation */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] font-mono tracking-widest uppercase">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">HOME</button>
          <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">ABOUT</button>
          <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors">PORTFOLIO</button>
          <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">BLOG</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">CONTACT</button>
        </div>

        {/* Right Side: Back to Top & Copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <button
            onClick={handleBackToTop}
            className="w-10 h-10 rounded-full border border-neutral-900 hover:border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-neutral-950/40"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className="font-mono text-[9px] text-neutral-600 tracking-wider">
            © {currentYear} SHVTTER STORIES. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}

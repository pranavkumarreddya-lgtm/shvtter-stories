import { motion } from 'motion/react';
import { ArrowUp, Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    onNavigate('home');
  };

  return (
    <footer className="bg-[#060606] border-t border-neutral-900/50 px-6 py-16 md:px-12 lg:px-24 text-neutral-400">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Bio */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer select-none" onClick={() => onNavigate('home')}>
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

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-mono text-[9px] tracking-widest text-gold-400 uppercase font-bold mb-4">QUICK LINKS</h4>
            <div className="flex flex-col gap-3 text-[11px]">
              {['home', 'about', 'portfolio', 'services', 'team', 'blog', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className="text-left text-neutral-400 hover:text-white transition-colors capitalize cursor-pointer"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-mono text-[9px] tracking-widest text-gold-400 uppercase font-bold mb-4">CONTACT</h4>
            <div className="space-y-3 text-[11px]">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 text-neutral-600" />
                <a href="mailto:contact@shvtterstories.com" className="hover:text-white transition-colors">
                  contact@shvtterstories.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-neutral-600" />
                <a href="tel:+12125558920" className="hover:text-white transition-colors">
                  +1 (212) 555-8920
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-neutral-600" />
                <span>422 Greenwich St, Tribeca<br/>New York, NY 10013</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social & Map */}
          <div>
            <h4 className="font-mono text-[9px] tracking-widest text-gold-400 uppercase font-bold mb-4">FOLLOW US</h4>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 10 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-neutral-800 hover:border-gold-600 flex items-center justify-center text-neutral-500 hover:text-gold-400 transition-colors cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            {/* Map Placeholder */}
            <div className="w-full h-24 rounded-lg bg-neutral-900/50 border border-neutral-900 flex items-center justify-center">
              <span className="font-mono text-[8px] tracking-widest text-neutral-700 uppercase">📍 TRIBECA, NYC</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="font-mono text-[9px] text-neutral-600 tracking-wider">
            © {currentYear} SHVTTER STORIES. ALL RIGHTS RESERVED.
          </span>
          <button
            onClick={handleBackToTop}
            className="w-10 h-10 rounded-full border border-neutral-900 hover:border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-neutral-950/40 cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

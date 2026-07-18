import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 32); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'PORTFOLIO', id: 'portfolio' },
    { label: 'SERVICES', id: 'services' },
    { label: 'TEAM', id: 'team' },
    { label: 'BLOG', id: 'blog' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/65 px-6 backdrop-blur-xl transition-all duration-500 md:px-12 ${isScrolled ? 'py-3 shadow-xl shadow-black/20' : 'py-5'}`}>
      {/* Left side: Logo */}
      <div 
        className="flex items-center cursor-pointer select-none group" 
        onClick={() => handleItemClick('home')}
        id="header-logo"
      >
        {/* Custom SVG Camera Icon */}
        <div className="relative w-9 h-9 border border-neutral-700 rounded-md flex items-center justify-center mr-3 group-hover:border-gold-400 transition-colors duration-300">
          <div className="w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center group-hover:border-gold-300 transition-colors duration-300">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-gold-400 transition-colors duration-300" />
          </div>
          <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-neutral-700" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-semibold tracking-[0.2em] text-sm text-white group-hover:text-neutral-200 transition-colors duration-300">
            SHVTTER
          </span>
          <span className="font-mono text-[9px] tracking-[0.4em] text-gold-400 font-medium">
            STORIES
          </span>
        </div>
      </div>

      {/* Center: Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-10" id="desktop-nav">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="relative text-[11px] font-medium tracking-[0.25em] text-neutral-400 hover:text-white transition-colors duration-300 py-1"
              id={`nav-item-${item.id}`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-200"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right side: Desktop CTA */}
      <button
        onClick={() => handleItemClick('contact')}
        className="hidden md:flex items-center text-[10px] font-medium tracking-[0.25em] text-neutral-400 hover:text-gold-300 transition-all duration-300 uppercase group"
        id="cta-work-together"
      >
        LET'S WORK TOGETHER
        <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-neutral-500 group-hover:text-gold-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-neutral-400 hover:text-white transition-colors"
        id="mobile-menu-toggle"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md border-b border-neutral-800 py-8 px-6 flex flex-col space-y-6 md:hidden z-40"
            id="mobile-nav-drawer"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`text-left text-xs font-semibold tracking-[0.25em] py-2 transition-colors duration-200 ${
                      isActive ? 'text-gold-400 pl-2 border-l border-gold-400' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="border-t border-neutral-900 pt-6">
              <button
                onClick={() => handleItemClick('contact')}
                className="flex items-center text-xs font-semibold tracking-[0.25em] text-gold-400"
              >
                LET'S WORK TOGETHER
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

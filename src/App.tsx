import { useState, useEffect } from 'react';
import Header from './components/Header';
import BackgroundVideo from './components/BackgroundVideo';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import ShowreelModal from './components/ShowreelModal';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import { CategoryType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState<CategoryType>('ALL');
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Monitor scroll positioning to update active section indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 180; // offset for the sticky header height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Switch category filter and scroll user to portfolio index
  const handleFilterChange = (category: CategoryType) => {
    setSelectedFilter(category);
    
    // Smooth scroll down to the portfolio gallery section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPortfolioClick = () => {
    handleNavigate('portfolio');
  };

  const handleWatchShowreelClick = () => {
    setIsShowreelOpen(true);
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {/* Scroll-scrubbed background video (fixed behind everything, rendered outside the content wrapper so z-index stacking works) */}
      <BackgroundVideo />

      <div className="relative z-0 min-h-screen text-white flex flex-col font-sans selection:bg-gold-500 selection:text-black">
        {/* Sticky Header */}
        <Header 
          activeSection={activeSection} 
          onNavigate={handleNavigate} 
        />

        {/* Main Single Page Sections */}
        <main className="flex-grow">
          {/* Home/Hero fold */}
          <Hero 
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            onWatchShowreel={handleWatchShowreelClick}
            onViewPortfolio={handleViewPortfolioClick}
          />

          {/* Portfolio Index fold */}
          <Portfolio 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {/* About profile & Gear bag fold */}
          <About />

          {/* Blog journal fold */}
          <Blog />

          {/* Contact/Booking fold */}
          <Contact />
        </main>

        {/* Footer credits fold */}
        <Footer onNavigate={handleNavigate} />

        {/* Immersive Cinematic Showreel Modal */}
        <ShowreelModal 
          isOpen={isShowreelOpen} 
          onClose={() => setIsPlayingState(false)} 
        />
      </div>
    </>
  );

  // Helper hook cleanup or inline references
  function setIsPlayingState(state: boolean) {
    setIsShowreelOpen(state);
  }
}


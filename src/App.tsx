import { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import BackgroundVideo from './components/BackgroundVideo';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { CategoryType } from './types';

// Lazy-load below-fold sections for code splitting
const Portfolio = lazy(() => import('./components/Portfolio'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Team = lazy(() => import('./components/Team'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const InstagramFeed = lazy(() => import('./components/InstagramFeed'));
const ShowreelModal = lazy(() => import('./components/ShowreelModal'));

// Minimal loading fallback
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-6 h-6 border-2 border-neutral-800 border-t-gold-400 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState<CategoryType>('ALL');
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Monitor scroll positioning to update active section indicators
  useEffect(() => {
    const sections = ['home', 'about', 'portfolio', 'services', 'team', 'blog', 'contact'];
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 180;
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
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleFilterChange = (category: CategoryType) => {
    setSelectedFilter(category);
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
      {/* Hero-only background video */}
      <BackgroundVideo />

      <div className="relative z-0 min-h-screen text-white flex flex-col font-sans selection:bg-gold-500 selection:text-black">
        <Header
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main className="flex-grow">
          {/* Hero — above the fold, not lazy loaded */}
          <Hero
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            onWatchShowreel={handleWatchShowreelClick}
            onViewPortfolio={handleViewPortfolioClick}
          />

          {/* Below-fold sections with lazy loading */}
          <Suspense fallback={<SectionLoader />}>
            <Portfolio
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Team />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Blog />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <InstagramFeed />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        <Footer onNavigate={handleNavigate} />

        <Suspense fallback={null}>
          {isShowreelOpen && (
            <ShowreelModal
              isOpen={isShowreelOpen}
              onClose={() => setIsShowreelOpen(false)}
            />
          )}
        </Suspense>
      </div>
    </>
  );
}

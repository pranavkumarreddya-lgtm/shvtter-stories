import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import BackgroundVideo from './components/BackgroundVideo';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { CategoryType } from './types';
import LoadingScreen from './components/LoadingScreen';
import BookingCta from './components/BookingCta';

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

interface SectionMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
}

const SECTION_METADATA: Record<string, SectionMetadata> = {
  home: {
    title: 'Shvtter Stories | Wedding, Portrait & Commercial Photography NYC',
    description: 'Shvtter Stories creates cinematic wedding, portrait, event, travel and commercial photography from our New York studio and around the world.',
    keywords: 'Shvtter Stories, photography studio, wedding photographer, portrait photographer, event photography, commercial photography, New York photographer',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/',
    ogTitle: 'Shvtter Stories | Wedding, Portrait, Event & Commercial Photography',
    ogDescription: 'Cinematic photography for weddings, portraits, events and brands.'
  },
  about: {
    title: 'About Shvtter Stories | Photography Philosophy & NYC Studio',
    description: 'Discover the biography, history, and photography philosophy of Shvtter Stories. Learn about our minimalist fine-art style and precision camera gear.',
    keywords: 'about shvtter stories, camera bag, photography philosophy, nyc photographer biography, fine art print, camera gear nyc',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/#about',
    ogTitle: 'About Shvtter Stories | Biography & Photography Philosophy',
    ogDescription: 'Detailing over a decade of visual storytelling across continents and the professional camera gear bag backing our high-precision results.'
  },
  portfolio: {
    title: 'Photography Portfolio | Landscapes, Portraits & Street Scenes | Shvtter Stories',
    description: 'Explore the Shvtter Stories professional photo portfolio. View selected landscape, portrait, wildlife, travel, and commercial work from 2024—2026.',
    keywords: 'photography portfolio, wedding portfolio, street photography gallery, travel photos, landscape shots, professional camera work',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/#portfolio',
    ogTitle: 'Photography Portfolio | Selected Works 2024—26 | Shvtter Stories',
    ogDescription: 'A rich showcase of patient, instinctual frames capturing street, landscape, portrait, wildlife, and commercial memories.'
  },
  services: {
    title: 'Photography Services & Pricing | Wedding & Portrait Packages',
    description: 'View investment tiers and pricing packages for professional photography services by Shvtter Stories, from portrait sessions to commercial shoots.',
    keywords: 'photography pricing, wedding photography packages, portrait session rates, corporate rates, commercial campaign cost, nyc photographer cost',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/#services',
    ogTitle: 'Photography Pricing & Investment Services | Shvtter Stories',
    ogDescription: 'Clear pricing tiers for portraits, editorial travel, wedding coverages, and commercial campaigns with full highlights.'
  },
  team: {
    title: 'Meet the Photography Team | Professional Artists | Shvtter Stories',
    description: 'Get to know the passionate photographers behind Shvtter Stories. Discover our specialties, experience, and standard for cinematic images.',
    keywords: 'photography shooters, shvtter stories team, portrait photographer, nyc lead photographer, creative specialists',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/#team',
    ogTitle: 'Meet the Creative Portrait/Wedding Photographers | Shvtter Stories',
    ogDescription: 'Discover our expert visual artists trusted for client celebrations, corporate campaigns, and street documentaries.'
  },
  blog: {
    title: 'The Field Journal | Photography Tips, Behind-the-Scenes & Travel Blog',
    description: 'Read the Shvtter Stories blog for travel journals, photography tips, camera techniques, and behind-the-scenes stories from the field.',
    keywords: 'photography blog, writing on photography, travel journal, behind the scenes photographer, camera tips, nyc photography journal',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/#blog',
    ogTitle: 'The Field Journal & Behind The Lens Blog | Shvtter Stories',
    ogDescription: 'Behind-the-scenes write-ups on optical studies, camera calibration, fine art durability and reflections from the field.'
  },
  contact: {
    title: 'Contact Shvtter Stories | Book a Photography Session NYC',
    description: 'Get in touch with Shvtter Stories to book your wedding, portrait, or commercial photography session. Locate our Tribeca, NY studio.',
    keywords: 'contact photographer, hire photographer nyc, booking photo session, photography studios Tribeca, wedding photographer contact',
    canonical: 'https://pranavkumarreddya-lgtm.github.io/shvtter-stories/#contact',
    ogTitle: 'Book Your Photography Session | Contact Shvtter Stories',
    ogDescription: 'Submit a creative brief for custom packages or call our Tribeca office to schedule an appointment for photo shoots.'
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState<CategoryType>('ALL');
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setIsLoading(false), reduced ? 100 : 6700);
    return () => window.clearTimeout(timer);
  }, []);

  // Update Dynamic Document Metadata
  useEffect(() => {
    const meta = SECTION_METADATA[activeSection] || SECTION_METADATA.home;
    document.title = meta.title;

    // Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update Meta Keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', meta.keywords);

    // Update Canonical Link tag
    let canonicalTagLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalTagLink) {
      canonicalTagLink = document.createElement('link');
      canonicalTagLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTagLink);
    }
    canonicalTagLink.setAttribute('href', meta.canonical);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.ogTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.ogDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', meta.canonical);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.ogTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', meta.ogDescription);

    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', meta.canonical);
  }, [activeSection]);

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
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
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

          <BookingCta onBook={() => handleNavigate('contact')} />

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

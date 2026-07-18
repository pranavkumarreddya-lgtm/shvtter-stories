import { PortfolioItem, BlogPost, GearItem, ServicePackage, Testimonial, TeamMember } from './types';


export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Silent Fjords',
    category: 'LANDSCAPE',
    location: 'Lofoten, Norway',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      focalLength: '24mm',
      aperture: 'f/8.0',
      shutter: '1/160s',
      iso: '100'
    },
    story: 'Capturing the absolute quiet of the morning fog lifting from the cold northern waters as the first light breaks.',
    date: 'Jan 2026'
  },
  {
    id: '2',
    title: 'Ethereal Dunes',
    category: 'LANDSCAPE',
    location: 'Namib-Naukluft, Namibia',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      focalLength: '135mm',
      aperture: 'f/11',
      shutter: '1/250s',
      iso: '100'
    },
    story: 'The harsh diagonal shadows formed by the blazing sun on the red desert sand dunes, creating a high-contrast abstract painting.',
    date: 'Mar 2026'
  },
  {
    id: '3',
    title: 'The Sculptor\'s Hands',
    category: 'PORTRAIT',
    location: 'Florence, Italy',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 50mm f/1.2 GM',
      focalLength: '50mm',
      aperture: 'f/1.2',
      shutter: '1/500s',
      iso: '200'
    },
    story: 'A close-up portrait of an elderly artisan in his dusty workshop, capturing decades of wisdom and craftsmanship in the lines of his hands.',
    date: 'Feb 2026'
  },
  {
    id: '4',
    title: 'Minds of the Sahara',
    category: 'PORTRAIT',
    location: 'Erg Chebbi, Morocco',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 85mm f/1.4 GM',
      focalLength: '85mm',
      aperture: 'f/1.4',
      shutter: '1/1000s',
      iso: '100'
    },
    story: 'A powerful portrait capturing the deep, piercing gaze of a nomadic Tuareg elder wearing his traditional indigo tagelmust.',
    date: 'Apr 2026'
  },
  {
    id: '5',
    title: 'Apex Solitude',
    category: 'WILDLIFE',
    location: 'Yellowstone, USA',
    specs: {
      camera: 'Sony A1',
      lens: 'FE 600mm f/4 GM OSS',
      focalLength: '600mm',
      aperture: 'f/4.0',
      shutter: '1/1600s',
      iso: '400'
    },
    story: 'A lone grey wolf looking over a snowy ridge at dawn, standing perfectly still while scanning the quiet valley below.',
    date: 'Dec 2025'
  },
  {
    id: '6',
    title: 'Flight of the Osprey',
    category: 'WILDLIFE',
    location: 'Florida Keys, USA',
    specs: {
      camera: 'Sony A1',
      lens: 'FE 200-600mm f/5.6-6.3 G OSS',
      focalLength: '400mm',
      aperture: 'f/6.3',
      shutter: '1/3200s',
      iso: '800'
    },
    story: 'An osprey caught mid-dive, wings folded back with absolute precision, moments before breaking the glassy surface of the ocean.',
    date: 'Nov 2025'
  },
  {
    id: '7',
    title: 'Sunrise at Kyoto',
    category: 'TRAVEL',
    location: 'Kyoto, Japan',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      focalLength: '35mm',
      aperture: 'f/5.6',
      shutter: '1/80s',
      iso: '200'
    },
    story: 'Golden rays filter through the vermillion torii gates of Fushimi Inari, free of the crowds in the peaceful hour of dawn.',
    date: 'May 2026'
  },
  {
    id: '8',
    title: 'Varanasi Rhythms',
    category: 'TRAVEL',
    location: 'Varanasi, India',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 35mm f/1.4 GM',
      focalLength: '35mm',
      aperture: 'f/2.0',
      shutter: '1/200s',
      iso: '400'
    },
    story: 'A boatman navigating the quiet morning waters of the Ganges, silhouetted against the rising sun and the ancient steps of the ghats.',
    date: 'Oct 2025'
  },
  {
    id: '9',
    title: 'Neon Solitude',
    category: 'STREET',
    location: 'Shinjuku, Japan',
    specs: {
      camera: 'Sony A7S III',
      lens: 'FE 35mm f/1.4 GM',
      focalLength: '35mm',
      aperture: 'f/1.4',
      shutter: '1/125s',
      iso: '1600'
    },
    story: 'A single figure with an umbrella walking past a glowing wall of neon restaurant signs under a light, moody midnight drizzle.',
    date: 'Jun 2026'
  },
  {
    id: '10',
    title: 'Subway Glances',
    category: 'STREET',
    location: 'London, UK',
    specs: {
      camera: 'Sony A7S III',
      lens: 'FE 50mm f/1.2 GM',
      focalLength: '50mm',
      aperture: 'f/1.8',
      shutter: '1/250s',
      iso: '800'
    },
    story: 'Fleeting moments on the Underground. High-contrast black and white showing the geometric repetition of windows and tired commuters.',
    date: 'Sep 2025'
  },
  {
    id: '11',
    title: 'Precision Chrono',
    category: 'COMMERCIAL',
    location: 'Studio, New York',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 90mm f/2.8 Macro G OSS',
      focalLength: '90mm',
      aperture: 'f/16',
      shutter: '1/200s',
      iso: '100'
    },
    story: 'Studio macro shot of an open skeleton watch back, showing the fine balance wheel and interlocking gold gears in sharp focus.',
    date: 'Feb 2026'
  },
  {
    id: '12',
    title: 'Sartorial Lines',
    category: 'COMMERCIAL',
    location: 'Studio, Milan',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 50mm f/1.2 GM',
      focalLength: '50mm',
      aperture: 'f/4.0',
      shutter: '1/200s',
      iso: '100'
    },
    story: 'A dramatic editorial lighting setup highlighting the architectural lines and fine pinstripe texture of an Italian tailored suit.',
    date: 'Mar 2026'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Chasing the Light: The Art of Golden Hour',
    category: 'TUTORIAL',
    date: 'June 12, 2026',
    readTime: '5 min read',
    summary: 'A comprehensive guide on mastering camera settings, positioning, and composition during the magical hour of sunrise and sunset.',
    content: `Golden hour is the brief window of time just after sunrise or before sunset when the sun is low in the sky, producing a warm, soft, and glowing light. Unlike the harsh, overhead light of midday, golden hour light creates long, elegant shadows and rich, dimensional textures.

### Key Camera Settings to Consider:
1. **White Balance:** Manually switch from Auto White Balance (AWB) to "Cloudy" or "Shade". This will enhance the natural golden, amber tones instead of letting the camera correct them to neutral.
2. **Exposure:** Meter for the highlights. Golden hour is perfect for dramatic silhouettes, so slightly underexposure is your friend.
3. **Aperture:** If you want deep shadows and sharp structures, step down to f/8 or f/11. For glowing, dreamy portraits, shoot wide open at f/1.4 or f/1.8 to capture those stunning bokeh orbs.

### Composition and Angles:
- **Backlighting:** Position your subject between yourself and the sun. This creates a gorgeous "rim light" outline that separates them from the background.
- **Side Lighting:** Shoot at a 90-degree angle to the sun. This accentuates textures in landscapes, such as mountain ridges or desert sand dunes.
- **Silhouettes:** Find a strong outline, place it directly in front of the warm sky, and underexpose the shot.`
  },
  {
    id: 'blog-2',
    title: 'Minimalism in Portraiture',
    category: 'PHILOSOPHY',
    date: 'May 28, 2026',
    readTime: '4 min read',
    summary: 'How removing distractions and focusing on raw emotion, shadows, and clean geometry creates powerful, unforgettable human stories.',
    content: `In a world filled with constant visual noise, minimalism in portraiture acts as a powerful statement. It is the active decision of what to leave *out* of the frame rather than what to pack inside it.

### The Power of Negative Space
Negative space is the empty area surrounding a subject. By giving your subject generous room to breathe, you force the viewer's eye directly onto the emotion of the face. An expansive black wall, a flat grey sky, or a plain canvas studio backdrop can all act as gorgeous negative space.

### Sculpting with Single Lights
You do not need five studio strobes to make a striking portrait. A single light source—like a window at dusk or a single directional softbox—creates rich shadows that naturally contour the human face. This technique, heavily inspired by Chiaroscuro painters like Caravaggio, tells a much deeper, more dramatic story than flat, uniform lighting ever could.`
  },
  {
    id: 'blog-3',
    title: 'The Unseen Street: Street Photography Ethics',
    category: 'REFLECTIONS',
    date: 'April 15, 2026',
    readTime: '6 min read',
    summary: 'Navigating public spaces, capturing raw candid moments, and respecting human dignity in modern street photography.',
    content: `Street photography is about capturing the candid theater of everyday life. It is raw, unpredictable, and spontaneous. However, operating a camera in public spaces comes with a high degree of responsibility and ethics.

### Crucial Guidelines for Street Shooting:
1. **Respect Human Dignity:** Avoid photographing people in vulnerable, compromising, or highly embarrassing situations. Our goal as photographers is to document humanity, not exploit it.
2. **Be Open, Not Sneaky:** If someone notices you taking their photo, smile, show them the back of your camera, and offer to email them a copy. Being transparent and warm de-escalates almost any situation instantly.
3. **Know the Law, but Value Comfort:** While shooting in public places is generally legal in most democratic countries, if someone asks you to delete a photo of them, respect their wishes. A peaceful interaction is worth far more than a single frame.`
  }
];

export const gearInventory: GearItem[] = [
  {
    category: 'Camera Bodies',
    model: 'Sony Alpha 7R V (61.0 MP)',
    purpose: 'Main high-resolution body for landscapes, portraits, and fine-art prints.'
  },
  {
    category: 'Camera Bodies',
    model: 'Sony Alpha 1 (50.1 MP, 30fps)',
    purpose: 'High-speed powerhouse for wildlife tracking and fast-moving action.'
  },
  {
    category: 'Camera Bodies',
    model: 'Sony Alpha 7S III (12.1 MP, Low Light)',
    purpose: 'Unrivaled high-ISO performance for street work at night and video showreels.'
  },
  {
    category: 'Prime Lenses',
    model: 'Sony FE 50mm f/1.2 G Master',
    purpose: 'The ultimate normal lens. Striking contrast, razor sharpness, and beautiful rendering.'
  },
  {
    category: 'Prime Lenses',
    model: 'Sony FE 85mm f/1.4 G Master',
    purpose: 'Classic portrait lens, rendering portraits with creamy, dreamlike out-of-focus elements.'
  },
  {
    category: 'Zoom Lenses',
    model: 'Sony FE 24-70mm f/2.8 G Master II',
    purpose: 'Versatile standard zoom. Always attached during travel and exploration hikes.'
  },
  {
    category: 'Telephoto Lenses',
    model: 'Sony FE 200-600mm f/5.6-6.3 G OSS',
    purpose: 'Essential lens for safely capturing wildlife at extreme focal ranges.'
  }
];

export const servicePackages: ServicePackage[] = [
  {
    id: 'svc-1',
    title: 'Portrait Session',
    subtitle: 'Individual & Couples',
    price: '$1,500',
    features: ['2-hour studio or outdoor session', '40+ edited high-res images', 'Professional retouching', 'Private online gallery', 'Print-ready files']
  },
  {
    id: 'svc-2',
    title: 'Wedding Story',
    subtitle: 'Full-Day Coverage',
    price: '$5,000',
    features: ['10-hour day coverage', '500+ edited images', 'Second photographer included', 'Engagement session', 'Premium leather album', 'Cinematic highlight reel'],
    highlighted: true
  },
  {
    id: 'svc-3',
    title: 'Event Coverage',
    subtitle: 'Corporate & Social',
    price: '$2,500',
    features: ['4-hour event coverage', '200+ edited images', 'Same-day preview gallery', 'Social media optimized exports', 'Commercial usage license']
  },
  {
    id: 'svc-4',
    title: 'Commercial Campaign',
    subtitle: 'Brand & Product',
    price: 'Custom',
    features: ['Full creative direction', 'Product styling & set design', 'Unlimited edited selects', 'Campaign-ready deliverables', 'Multi-platform licensing']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aisha Rahman',
    projectType: 'Wedding Photography',
    quote: 'They captured every single moment we dreamed of and so many we never expected. The photos feel like stepping back into the happiest day of our lives.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    projectType: 'Commercial Campaign',
    quote: 'The attention to detail in the product shots was exceptional. Our brand identity has never looked this premium. Sales increased 40% after the campaign launch.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Elena Vasquez',
    projectType: 'Portrait Session',
    quote: 'I was nervous about being in front of a camera, but they made the entire experience feel so natural. The portraits are absolute works of art.',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'David Thornton',
    projectType: 'Event Coverage',
    quote: 'Professional, unobtrusive, and incredibly talented. The corporate gala photos were delivered within 48 hours and exceeded all expectations.',
    rating: 5
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Alexander Mercer',
    role: 'Lead Photographer & Founder',
    specialty: 'Landscape, Travel & Fine Art',
    bio: 'Over a decade of international experience capturing the raw beauty of natural environments and human moments across 40+ countries.'
  },
  {
    id: 'team-2',
    name: 'Sofia Nakamura',
    role: 'Senior Portrait Artist',
    specialty: 'Portraits, Fashion & Weddings',
    bio: 'Expert in sculpting light to reveal the authentic character and soul of every subject, from intimate portraits to editorial fashion campaigns.'
  },
  {
    id: 'team-3',
    name: 'James Okonkwo',
    role: 'Commercial & Product Specialist',
    specialty: 'Product, Architecture & Luxury Brands',
    bio: 'Bringing meticulous precision to commercial assignments, ensuring every product shot conveys luxury, quality, and brand narrative.'
  },
  {
    id: 'team-4',
    name: 'Catalina Reyes',
    role: 'Documentary & Street Photographer',
    specialty: 'Street, Documentary & Events',
    bio: 'Passionate about capturing the candid theater of everyday life and preserving authentic moments at private and corporate events.'
  }
];

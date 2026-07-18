export type CategoryType = 'ALL' | 'LANDSCAPE' | 'PORTRAIT' | 'WILDLIFE' | 'TRAVEL' | 'STREET' | 'COMMERCIAL';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<CategoryType, 'ALL'>;
  location: string;
  specs: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  story: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface GearItem {
  category: string;
  model: string;
  purpose: string;
}

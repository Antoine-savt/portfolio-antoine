export enum ProjectCategory {
  WEB = 'Site Web',
  APP = 'Application',
  PORTFOLIO = 'Portfolio',
  ECOMMERCE = 'E-commerce'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: ProjectCategory;
  tags: string[];
  imageUrl: string;
  link?: string;
  github?: string;
  featured: boolean;
  year: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}
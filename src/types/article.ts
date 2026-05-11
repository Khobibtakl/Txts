export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  author: string;
  readTime: number; // in minutes
  publishedAt: string;
  imageUrl: string;
  isFeatured?: boolean;
}

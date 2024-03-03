export interface BookRecord {
  id: number;
  name: string;
  title: string;
  rating: number;
  url: string;
  author: string;
  uploadedBy: string;
  description: string;
}

export interface ExploreProps {
  bookKeywords: string | undefined;
}

export interface Message {
  id?: string;
  userId: string;
  title: string;
  message: string;
  date?: string;
  imageUrl?: string;
  slug: string;
  createdAt?: string;
}
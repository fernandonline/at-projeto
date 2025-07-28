export interface User {
  id?: string;
  uid: string; // ID do Firebase
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Message {
  id?: string;
  userId: string;
  title: string;
  message: string;
  date?: string;
  imageUrl?: string;
  publicLink: string;
  publicLinkQR: string;
}
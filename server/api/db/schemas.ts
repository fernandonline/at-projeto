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
  date: string;
  message: string;
  imageUrl?: string;
  publicLink: string;
  publicLinkQR: string;
}
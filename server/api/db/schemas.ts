import mongoose from "mongoose";

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


export function getUsersModel() {
  const schema = new mongoose.Schema({
    uid: String,
    email: String,
    name: String,
    createdAt: Date,
  });
  return mongoose.models.User || mongoose.model("User", schema);
}

export function getMessagesModel() {
  const schema = new mongoose.Schema({
    userId: String,
    title: String,
    date: String,
    message: String,
    publicLink: String,
    publicLinkQR: String,
    createdAt: { type: Date, default: Date.now }
  });
  return mongoose.models.Message || mongoose.model("Message", schema);
}
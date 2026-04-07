import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    // Діагностика: перевіряємо, чи є змінна
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('MONGO_URL exists:', !!process.env.MONGO_URL);

    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      console.error('❌ MONGO_URL is not defined');
      console.error('Available env vars:', Object.keys(process.env));
      throw new Error('MONGO_URL environment variable is not set');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Successfully connected to MongoDB');

    await Note.syncIndexes();
    console.log("Indexes synced successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};



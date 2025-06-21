// db.ts
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGOURL = process.env.MONGO_DB_URL;
    if (!MONGOURL) {
      throw new Error("MONGO_DB_URL is not defined in the .env file");
    }

    await mongoose.connect(MONGOURL);
    console.log('✅ DATABASE CONNECTED');
  } catch (error: any) {
    console.error('❌ DATABASE CONNECTION FAILED:', error.message);
    process.exit(1); 
  }
};

export default connectDB;

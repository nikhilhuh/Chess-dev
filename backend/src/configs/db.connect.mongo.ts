import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the type for the MongoDB URI
const URI: string | undefined = process.env.MONGO_URI;

if (!URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred while connecting to MongoDB.');
    }
    process.exit(1);
  }
};

export default ConnectDB;
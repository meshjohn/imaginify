import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  console.log("Attempting to connect to MongoDB...");
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URL, {
        dbName: "saas",
        bufferCommands: false,
      });
      cached.conn = await cached.promise;
    } catch (error) {
      cached.promise = null; // Reset promise in case of failure
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  console.log("MongoDB connected");
  return cached.conn;
};

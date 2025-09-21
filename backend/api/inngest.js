import { Inngest } from "inngest";
import { serve } from "inngest/express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Initialize Inngest
const inngest = new Inngest({
  id: "slack-clone",
  eventKey: process.env.INGEST_EVENT_KEY,
  signingKey: process.env.INGEST_SIGNING_KEY,
});

// Database connection function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully:', conn.connection.host);
  } catch (error) {
    console.log('Error connecting to mongoDB:', error);
    throw error;
  }
};

// Simple test function
const testFunction = inngest.createFunction(
  { id: "test-function" },
  { event: "test/event" },
  async ({ event }) => {
    console.log('Test function triggered:', event);
    return { success: true, message: 'Test function executed' };
  }
);

const functions = [testFunction];
const handler = serve({ client: inngest, functions });

export default async function(req, res) {
  try {
    // Handle all HTTP methods
    if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      return handler(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in inngest handler:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

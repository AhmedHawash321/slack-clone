import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


console.log('Environment:', process.env.NODE_ENV);

app.use(clerkMiddleware())


app.get('/', (req, res) => {
    res.send('Hello World');
})


console.log('mongo uri:', process.env.MONGO_URI);
process.env.CLERK_PUBLISHABLE_KEY
console.log('clerck secret key', process.env.CLERK_SECRET_KEY ? 'loaded successfully' : 'not loaded');
process.env.STREAM_API_KEY
console.log('stream secret key', process.env.STREAM_API_SECRET ? 'loaded successfully' : 'not loaded');
console.log('sentry dsn', process.env.SENTRY_DSN ? 'loaded successfully' : 'not loaded');
process.env.INGEST_EVENT_KEY
console.log('ingest sign key', process.env.INGEST_SIGNING_KEY ? 'loaded successfully' : 'not loaded');

const startServer = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
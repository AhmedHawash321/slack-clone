import dotenv from "dotenv";

dotenv.config();

export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API endpoint is working',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    envCheck: {
      INGEST_EVENT_KEY: process.env.INGEST_EVENT_KEY ? 'SET' : 'NOT SET',
      INGEST_SIGNING_KEY: process.env.INGEST_SIGNING_KEY ? 'SET' : 'NOT SET',
      MONGO_URI: process.env.MONGO_URI ? 'SET' : 'NOT SET'
    }
  });
}

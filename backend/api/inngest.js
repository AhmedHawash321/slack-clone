import { inngest, functions } from "../src/config/inngest.js";
import { serve } from "inngest/express";

const handler = serve({ client: inngest, functions });

export default async function(req, res) {
  // Handle all HTTP methods
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    return handler(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

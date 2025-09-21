import { inngest, functions } from "../src/config/inngest.js";
import { serve } from "inngest/express";

const handler = serve({ client: inngest, functions });

export default async function(req, res) {
  return handler(req, res);
};

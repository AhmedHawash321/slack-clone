import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import {User} from "../models/user.model.js"; 

export const inngest = new Inngest({
  id: "slack-clone",
  eventKey: process.env.INGEST_EVENT_KEY,
  signingKey: process.env.INGEST_SIGNING_KEY,
});

const syncUser = inngest.createFunction(
    {id: "sync/user"},
    { event: "clerk/user.created" }, 
    async ({ event }) => {
        try {
            await connectDB();

            const {id, email_addresses, first_name, last_name, image_url} = event.data;

            const newUser = {
                clerkId: id, 
                email: email_addresses[0]?.email_address,
                name: `${first_name || ""} ${last_name || ""}`.trim(),
                image: image_url || "",
            }

            await User.create(newUser); 
        } catch (error) {
            console.error('Error in syncUser function:', error);
            throw error;
        }
    }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();
      const { id } = event.data;
      await User.deleteOne({ clerkId: id });
    } catch (error) {
      console.error('Error in deleteUserFromDB function:', error);
      throw error;
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];
import { Inngest } from "inngest";
import { connectDB } from "./db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone",  eventKey: process.env.INGEST_EVENT_KEY,
  signingKey: process.env.INGEST_SIGNING_KEY,});


const syncUser = inngest.createFunction(
    {id: "sync/user"},
    { event: "clerck/user.created" },
    async ({ event }) => {
        await connectDB()

        const {id, email_addresses, first_name, last_name, image_url} = event.data;

        const newUser = {
            clerckId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url || "",
        }

        await User.create(newUser)
    }
    
)

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  }
);
// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
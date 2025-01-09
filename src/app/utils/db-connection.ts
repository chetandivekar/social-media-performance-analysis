import { DataAPIClient } from "@datastax/astra-db-ts";

// Create a reusable function for DB connection
export const connectToDatabase = async () => {
  try {
    const client = new DataAPIClient(process.env.db_token); // Use your DB token here
    const db = client.db(
      "https://c9cb78b4-b01f-4cf2-8d41-0b6a5d704fee-us-east-2.apps.astra.datastax.com"
    ); // Astra DB URL

    // Optionally, check if the connection is successful by listing collections or performing a query
    return db; // Return the db object to be used for further queries
  } catch (error) {
    console.error("Error connecting to Astra DB", error);
    throw new Error("Database connection failed");
  }
};

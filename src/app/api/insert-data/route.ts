import { NextRequest, NextResponse } from "next/server";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const client = new DataAPIClient(process.env.db_token);
    const db = client.db(
      "https://c9cb78b4-b01f-4cf2-8d41-0b6a5d704fee-us-east-2.apps.astra.datastax.com"
    );
    const data = await request.json();
    console.log(data);

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Expected an array of documents" },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const documents = data.map((doc: any) => ({
      ...doc,
      id: doc.id || uuidv4(),
    }));

    const colls = await db.listCollections();
    console.log("Connected to AstraDB:", colls);
    const collection = db.collection("engagement_data");
    const result = await collection.insertMany(documents);

    console.log(result);

    return NextResponse.json(
      { message: "Results stored successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to store results" },
      { status: 500 }
    );
  }
}

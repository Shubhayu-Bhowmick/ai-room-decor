import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // Import your database instance
import { roomRedesigns } from "@/db/schema"; // Import the schema
import { eq } from "drizzle-orm"; // Import the equality operator for queries

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    // Fetch the room redesigns from the database for the given user ID
    const listings = await db
      .select()
      .from(roomRedesigns)
      .where(eq(roomRedesigns.userId, userId));

    return NextResponse.json({
      success: true,
      message: "Listings retrieved successfully.",
      listings,
    });
  } catch (error) {
    console.error("Error retrieving listings:", error);

    return NextResponse.json(
      { success: false, message: "Failed to retrieve listings.", listings: [] },
      { status: 500 }
    );
  }
}

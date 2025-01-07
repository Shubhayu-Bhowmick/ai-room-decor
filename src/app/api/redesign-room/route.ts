import { NextRequest, NextResponse } from "next/server";

// Define the types for the request body
interface RedesignRoomRequest {
  imageUrl: string | null;
  roomType: string;
  designStyle: string;
  additionalDetails: string;
}

// Define the response type
interface RedesignRoomResponse {
  success: boolean;
  message: string;
}

// POST handler for the API route
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming request body
    const body = (await req.json()) as RedesignRoomRequest;

    console.log("Received Room Data:", body);

    // Return a success response
    return NextResponse.json<RedesignRoomResponse>({
      success: true,
      message: "Room data received successfully.",
    });
  } catch (error) {
    console.error("Error processing request:", error);

    // Return an error response
    return NextResponse.json<RedesignRoomResponse>(
      {
        success: false,
        message: "Failed to process room data.",
      },
      { status: 500 }
    );
  }
}

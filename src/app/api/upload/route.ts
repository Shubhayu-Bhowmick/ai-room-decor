import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/db/cloudinary";

interface UploadRequestBody {
  image: string; // Base64 encoded image string
}

interface UploadResponse {
  url: string; // URL of the uploaded image
  error?: string; // Optional error message
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body and validate it
    const body = (await req.json()) as UploadRequestBody;

    if (!body.image) {
      return NextResponse.json<UploadResponse>(
        { url: "", error: "No image provided" },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(body.image, {
      folder: 'your-folder-name', // Optional: specify a folder in Cloudinary
    });

    // Return the URL of the uploaded image
    return NextResponse.json<UploadResponse>({ url: uploadResponse.secure_url });

  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json<UploadResponse>(
      { url: "", error: "Internal server error" },
      { status: 500 }
    );
  }
}

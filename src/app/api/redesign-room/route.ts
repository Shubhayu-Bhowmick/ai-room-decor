import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { cloudinary } from "@/db/cloudinary";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle"; // Import your database instance
import { roomRedesigns } from "@/db/schema"; // Import the schema

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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
  modifiedImageUrl: string;
}

interface UploadResponse {
    url: string; // URL of the uploaded image
    error?: string; // Optional error message
  }

// POST handler for the API route
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming request body
    const body = (await req.json()) as RedesignRoomRequest;

    if (!body.imageUrl) {
        return NextResponse.json(
          { success: false, message: "Image URL is required." },
          { status: 400 }
        );
      }

      const user = await currentUser(); // Get the current user
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not authenticated." },
          { status: 401 }
        );
      }

    const transformations = "w_512,h_512,c_fill,f_jpg";
    const transformedImageUrl = transformCloudinaryUrl(body.imageUrl, transformations);


    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      {
        input: {
          image: transformedImageUrl,
          prompt: `A ${body.roomType} with a ${body.designStyle} design style, featuring ${body.additionalDetails}.`,
          guidance_scale: 15,
          negative_prompt:
            "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      }
    );

    console.log("AI Output:", output);

    const base64Image = await streamToBase64(output as ReadableStream);
    const uploadResponse = await uploadToCloudinary(base64Image);

    if (!uploadResponse.url) {
        throw new Error("Failed to upload the modified image to Cloudinary.");
      }

      await db.insert(roomRedesigns).values({
        id: crypto.randomUUID(), // Generate a unique ID
        originalImageUrl: body.imageUrl,
        modifiedImageUrl: uploadResponse.url,
        userId: user.id, // Use the current user's ID
        designStyle: body.designStyle,
        additionalDetails: body.additionalDetails || null,
        roomType: body.roomType,
        createdAt: new Date(), // Optional if `defaultNow()` is set
      });


    // Return success response with the AI-modified image URL
    return NextResponse.json({ success: true, message:"image successfuly generated", modifiedImageUrl: uploadResponse.url });
  } catch (error) {
    console.error("Error processing request:", error);

    // Return an error response
    return NextResponse.json<RedesignRoomResponse>(
      {
        success: false,
        message: "Failed to redesign room.",
        modifiedImageUrl: "",
      },
      { status: 500 }
    );
  }
}

function transformCloudinaryUrl(url: string, transformations: string): string {
    const splitUrl = url.split("/upload/");
    if (splitUrl.length !== 2) {
      throw new Error("Invalid Cloudinary URL format.");
    }
    return `${splitUrl[0]}/upload/${transformations}/${splitUrl[1]}`;
  }
  
  async function streamToBase64(stream: ReadableStream): Promise<string> {
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let done, value;
  
    while ({ done, value } = await reader.read(), !done) {
      chunks.push(value);
    }
  
    // Combine chunks into a single buffer and convert to base64
    const buffer = Buffer.concat(chunks);
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  }

  async function uploadToCloudinary(base64Image: string): Promise<UploadResponse> {
    try {
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: 'ai-images', // Optional: specify a folder in Cloudinary
      });
  
      return { url: uploadResponse.secure_url };
    } catch (error) {
      console.error("Upload failed:", error);
      return { url: "", error: "Internal server error" };
    }
  }
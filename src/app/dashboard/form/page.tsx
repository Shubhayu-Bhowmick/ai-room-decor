"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  imageUrl: string | null;
  roomType: string;
  designStyle: string;
  additionalDetails: string;
}

interface UploadResponse {
  url: string;
  error?: string;
}

const roomTypes = [
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Bathroom",
  "Office",
  "Dining Room",
];

const designStyles = [
  {
    id: "modern",
    name: "Modern",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "industrial",
    name: "Industrial",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "bohemian",
    name: "Bohemian",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "traditional",
    name: "Traditional",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "rustic",
    name: "Rustic",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function FormPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    imageUrl: null,
    roomType: "",
    designStyle: "",
    additionalDetails: "",
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await uploadImage(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = (await response.json()) as UploadResponse;

        if (response.ok) {
          setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        } else {
          console.error("Upload failed:", data.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the form data to the API
      const response = await fetch("/api/redesign-room/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Define the response type
      interface RedesignRoomResponse {
        success: boolean;
        message: string;
      }

      // Parse the response
      const data = (await response.json()) as RedesignRoomResponse;

      if (response.ok && data.success) {
        console.log("API Response:", data.message);
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">
          Experience the Magic of AI Remodeling
        </h1>
        <p className="text-lg text-gray-600">
          Transform any room with a click. Select a space, choose a style, and
          watch as AI instantly reimagines your environment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Image of your room</h2>
          <div
            className={`border-2 border-dashed rounded-lg aspect-video relative flex flex-col items-center justify-center p-8 transition-colors
              ${
                dragActive
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-gray-400"
              }
              ${formData.imageUrl ? "p-0" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {mounted && formData.imageUrl ? (
              <Image
                src={formData.imageUrl}
                alt="Uploaded room"
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <>
                <p className="text-gray-600 text-center mb-4">
                  Drag and drop your image here, or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Room Type *</h2>
            <Select
              value={formData.roomType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, roomType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a room type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Select Interior Design Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {designStyles.map((style) => (
                <div
                  key={style.id}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all
                    ${
                      formData.designStyle === style.id
                        ? "ring-2 ring-purple-500 ring-offset-2"
                        : "hover:opacity-90"
                    }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, designStyle: style.id }))
                  }
                >
                  <Image
                    src={style.image}
                    alt={style.name}
                    width={300}
                    height={200}
                    className="w-full aspect-[3/2] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="text-white font-medium">{style.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Enter Additional Requirements (Optional)
            </h2>
            <Textarea
              placeholder="Add any specific requirements or preferences..."
              value={formData.additionalDetails}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalDetails: e.target.value,
                }))
              }
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-6">
            <Button
              type="submit"
              disabled={uploading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
            >
              {uploading ? "Uploading..." : "Generate"}
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            NOTE: 1 Credit will be used to redesign your room
          </p>
        </div>
      </form>
    </div>
  );
}

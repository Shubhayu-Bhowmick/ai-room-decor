import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Sparkles, Download } from "lucide-react";

interface Listing {
  id: string;
  modifiedImageUrl: string;
  roomType: string;
  designStyle: string;
  additionalDetails?: string;
}

export function Listings({ listings }: { listings: Listing[] }) {
  const handleDownload = async (url: string) => {
    try {
      // Fetch the image data
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a temporary URL for the Blob
      const downloadUrl = URL.createObjectURL(blob);

      // Create a link and trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "ai-generated-design.png";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to download the image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl animate-float"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="flex items-center justify-between mb-8">
          <div className="relative">
            <h2 className="text-4xl font-bold text-orange-600 mb-2">
              Your AI-Generated Designs
            </h2>
            <p className="text-orange-400 font-semibold">
              Transform your space with AI magic
            </p>
            <div className="absolute -top-6 -right-6">
              <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="group relative backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="absolute inset-0 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

              <div className="relative h-48">
                <Image
                  src={listing.modifiedImageUrl}
                  alt={`${listing.roomType} - ${listing.designStyle}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    {listing.roomType}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-orange-500" />
                  <p className="text-sm font-medium text-orange-500">
                    Style:{" "}
                    <span className="text-orange-400">
                      {listing.designStyle}
                    </span>
                  </p>
                </div>

                {listing.additionalDetails && (
                  <div className="relative">
                    <div className="absolute inset-0 backdrop-blur-sm rounded-lg" />
                    <p className="text-md text-orange-900 line-clamp-3 relative z-10">
                      {listing.additionalDetails}
                    </p>
                  </div>
                )}

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(listing.modifiedImageUrl)}
                  className="mt-4 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md shadow transition-all duration-300 hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Link href="/dashboard/form">
          <button
            className="fixed bottom-20 right-10 group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
            aria-label="Make a Design"
          >
            <Plus className="w-6 h-6 transition-transform group-hover:rotate-180" />
            <span>Make a Design</span>
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </Link>
      </div>
    </div>
  );
}

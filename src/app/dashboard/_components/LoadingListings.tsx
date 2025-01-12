import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export function LoadingListings() {
  return (
    <div className="space-y-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

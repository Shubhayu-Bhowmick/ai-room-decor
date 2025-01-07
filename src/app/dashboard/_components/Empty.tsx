import { Button } from "@/components/ui/button";

export function EmptyListings() {
  return (
    <div className="container flex flex-col items-center justify-center py-32 my-8 bg-gray-200 rounded-lg">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">No Designs Yet</h2>
        <p className="text-muted-foreground">
          Create your first AI-powered room design
        </p>
        <Button>+ Create New Design</Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
//import { LogOut } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [credits, setCredits] = useState(5);

  const handleBuyCredits = () => {
    // Implement credit purchase logic
    console.log("Buy credits clicked");
  };

  useEffect(() => {
    setCredits(10);
  }, []);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">AI Room Design</span>
          </div>
        </Link>

        <Button
          variant="ghost"
          onClick={handleBuyCredits}
          className="hidden md:inline-flex"
        >
          Buy More Credits
        </Button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1">
            <span className="text-sm font-medium">Credits:</span>
            <span className="text-sm font-bold">{credits}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

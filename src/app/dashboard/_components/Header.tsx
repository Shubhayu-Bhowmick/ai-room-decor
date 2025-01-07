"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Header() {
  const [credits, setCredits] = useState(5);

  const handleBuyCredits = () => {
    // Implement credit purchase logic
    console.log("Buy credits clicked");
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="AI Room Design Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">AI Room Design</span>
        </div>

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
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

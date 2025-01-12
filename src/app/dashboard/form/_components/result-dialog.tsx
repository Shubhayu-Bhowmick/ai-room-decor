"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BeforeAfter } from "./before-after";
import { Button } from "@/components/ui/button";
import { Download, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  originalImage: string;
  generatedImage: string;
}

export function ResultDialog({
  isOpen,
  onClose,
  originalImage,
  generatedImage,
}: ResultDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  const handleDownload = () => {
    if (!generatedImage) {
      alert("Image URL is not valid!");
      return;
    }

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "ai-generated-design.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={dialogRef} tabIndex={-1} className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Your AI Generated Room Design</DialogTitle>
        </DialogHeader>
        <BeforeAfter
          beforeImage={originalImage}
          afterImage={generatedImage}
          className="w-full"
        />
        <div className="flex justify-between mt-4">
          <Link href="/dashboard">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Design
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

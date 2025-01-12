"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function AuthButton() {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <span className="text-white hover:cursor-pointer bg-slate-200 bg-opacity-25 px-4 py-2 rounded-lg hover:bg-opacity-50">
            Sign In
          </span>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

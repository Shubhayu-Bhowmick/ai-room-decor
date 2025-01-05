"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import UserDetailContext from "./_context/UserDetailContext";

interface ProviderProps {
  children: ReactNode;
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  credits: number;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const { user } = useUser();

  // Specify the state type explicitly
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      if (user) {
        try {
          const response = await fetch("/api/verify-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
              imageUrl: user.imageUrl,
            }),
          });

          const userData = await response.json();
          setUserDetails(userData);
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      }
    };

    verifyUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;

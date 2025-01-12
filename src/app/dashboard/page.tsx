"use client";

import { useContext, useEffect, useState } from "react";
import { Listings } from "./_components/Listings";
import { EmptyListings } from "./_components/Empty";
import { LoadingListings } from "@/app/dashboard/_components/LoadingListings"; // Import the loading component
import UserDetailContext from "@/app/_context/UserDetailContext";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  //const [hasListings, setHasListings] = useState(false);
  const [listings, setListings] = useState([]);
  const { userDetails } = useContext(UserDetailContext); // Get user details from context

  useEffect(() => {
    async function fetchListings() {
      if (!userDetails || !userDetails.id) {
        console.error("User ID is not available in context.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userDetails.id }), // Pass the userId from context
        });

        const data = await response.json();

        if (data.success && data.listings.length > 0) {
          setListings(data.listings);
          //setHasListings(true);
        } else {
          setListings([]);
          // setHasListings(false);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
        //setHasListings(false);
      } finally {
        setIsLoading(false); // Stop loading after the API call completes
      }
    }

    fetchListings();
  }, [userDetails]);

  return (
    <div className="px-32">
      {isLoading ? (
        <LoadingListings /> // Show loading state while fetching
      ) : Listings ? (
        <Listings listings={listings} /> // Show listings if available
      ) : (
        <EmptyListings /> // Show empty state if no listings
      )}
    </div>
  );
}

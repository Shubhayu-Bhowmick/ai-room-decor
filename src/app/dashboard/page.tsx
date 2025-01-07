"use client";

import { useEffect, useState } from "react";
import { Listings } from "./_components/Listings";
import { EmptyListings } from "./_components/Empty";

export default function Page() {
  const [hasListings, setHasListings] = useState(false);

  useEffect(() => {
    setHasListings(false);
  }, []);

  return (
    <div className="px-32">
      {hasListings ? <Listings /> : <EmptyListings />}
    </div>
  );
}

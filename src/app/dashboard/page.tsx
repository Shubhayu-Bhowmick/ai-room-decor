"use client";

import React, { useContext } from "react";
import UserDetailContext from "../_context/UserDetailContext";

const Dashboard: React.FC = () => {
  // Access the user details context
  const context = useContext(UserDetailContext);

  // Handle case where context is undefined (shouldn't normally happen)
  if (!context) {
    throw new Error(
      "Dashboard must be used within a UserDetailContext provider"
    );
  }

  const { userDetails } = context;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {userDetails ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p>
            <strong>ID:</strong> {userDetails.id}
          </p>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Image:</strong>
          </p>
          <img
            src={userDetails.imageUrl}
            alt="User Profile"
            className="w-24 h-24 rounded-full my-2"
          />
          <p>
            <strong>Credits:</strong> {userDetails.credits}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Dashboard;

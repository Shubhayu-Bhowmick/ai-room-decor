"use client";

import { createContext, Dispatch, SetStateAction } from 'react';

// Define the user details type
interface UserDetails {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  credits: number;
}

// Define the context type
interface UserDetailContextType {
  userDetails: UserDetails | null;
  setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
}

// Provide a default value matching the type
const defaultContext: UserDetailContextType = {
  userDetails: null,
  setUserDetails: () => {}, // Placeholder function
};

const UserDetailContext = createContext<UserDetailContextType>(defaultContext);

export default UserDetailContext;

import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const accountApiUrl = import.meta.env.VITE_ACCOUNT_API_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImageUrl: "",
    phoneNumber: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    dateOfBirth: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token);  
    }
  }, [isLoggedIn]);

// Fetch user data using token
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${accountApiUrl}/api/account/profileInfo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json();
      console.log("Response received:", data);

      if (!response.ok || !data || !data.id) {
          console.error("Invalid response:", data);
      }
      
      setUser({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        phoneNumber: data.phoneNumber,
        streetAddress: data.streetAddress,
        postalCode: data.postalCode,
        city: data.city,
        dateOfBirth: data.dateOfBirth
      });
      setIsLoggedIn(true);
    } 
    catch (error) 
    {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
      setUser({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        profileImageUrl: "",
        phoneNumber: "",
        streetAddress: "",
        postalCode: "",
        city: "",
        dateOfBirth: ""
      });
      };
    }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  return useContext(AuthContext);
}
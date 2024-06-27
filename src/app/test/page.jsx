"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

function Page() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        console.log(response.data); // Check response structure and content
        setUserData(response.data); // Update 'userData' state
        setLoading(false); // Set loading to false after data is fetched
        console.log(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false); // Set loading to false on error
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures useEffect runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      {userData && <div>Username: {userData.username}</div>}
      {/* Render other user details as needed */}
    </div>
  );
}

export default Page;

import React, { useState, useEffect } from "react";
import { getIncrementValue, incrementValue } from "../api";
import { useNavigate } from "react-router-dom";

const IncrementPage = ({ token }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInitialValue = async () => {
      try {
        const userId = localStorage.getItem("UserId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await getIncrementValue(userId);
        if (response && response.incrementValue !== undefined) {
          setValue(response.incrementValue);
          console.log(response.incrementValue);
        }
      } catch (error) {
        console.error("Error fetching initial value:", error);
      }
    };

    fetchInitialValue();
  }, [token]);
  const handleIncrement = async () => {
    try {
      const UserId = localStorage.getItem("UserId");
      if (!UserId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await incrementValue(UserId);
      if (response && response.incrementValue !== undefined) {
        setValue(response.incrementValue);
      }
    } catch (error) {
      console.error("Error incrementing value:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserId");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6 text-blue-500">
        Current Value: {value}
      </h1>
      <div className="space-x-4">
        <button
          onClick={handleIncrement}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition-all"
        >
          Increment
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default IncrementPage;

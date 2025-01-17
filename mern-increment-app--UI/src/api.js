import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const incrementValue = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/increment`, { userId });
    return response.data;
  } catch (error) {
    console.error("Error incrementing value:", error);
    throw error;
  }
};

export const getIncrementValue = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Getincrement`, {
      params: { userId },
    });
    console.log(userId);
    return response.data;
  } catch (error) {
    console.error("Error fetching increment value:", error);
    throw error;
  }
};

// api.js

import axios from "axios";

const API_BASE_URL = "http://localhost:3001/"; // Replace with your API base URL
// const API_BASE_URL = "https://chat-apis.vercel.app/"; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to add a user
export const addUser = (userAddress, signature) => {
  return axiosInstance.post("/login", { userAddress, signature });
};

// Function to add a chat
export const addChat = (
  userAddress,
  chatId,
  promptText,
  responseText,
  token
) => {
  return axiosInstance.post(
    "/chat",
    { userAddress, chatId, promptText, responseText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Function to delete a chat
export const deleteChat = (chatId, token) => {
  return axiosInstance.delete(`/deleteChat/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getUserChatIds = (userAddress, token) => {
  return axiosInstance.get(`/getUserChatIds/${userAddress}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
import { handleServerResponse } from "./api.js";

const BASE_URL = "http://localhost:3001";
const USE_JSON_SERVER = false; // Should match the setting in api.js

export const register = ({ name, avatar, email, password }) => {
  if (USE_JSON_SERVER) {
    // Mock registration for JSON server mode
    return Promise.resolve({
      message: "Registration successful! You can now log in.",
      user: { name, email, avatar, _id: "test-user" },
    });
  }

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const login = ({ email, password }) => {
  if (USE_JSON_SERVER) {
    // Mock login for JSON server mode
    return Promise.resolve({
      token: "mock-jwt-token",
      user: { name: "Azionne Vorrice", email, _id: "test-user" },
    });
  }

  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  if (USE_JSON_SERVER) {
    // Mock token check for JSON server mode
    if (token === "mock-jwt-token") {
      return Promise.resolve({
        name: "Azionne Vorrice",
        email: "test@example.com",
        _id: "test-user",
      });
    } else {
      return Promise.reject("Invalid token");
    }
  }
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

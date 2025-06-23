// Configuration for different backends
const EXPRESS_BASE_URL = "http://localhost:3001"; // Express backend
const JSON_SERVER_BASE_URL = "http://localhost:3003"; // JSON server for testing

// Set this to true to use JSON server, false to use Express backend
const USE_JSON_SERVER = true; // Change to true to test with db.json

const baseUrl = USE_JSON_SERVER ? JSON_SERVER_BASE_URL : EXPRESS_BASE_URL;

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems(token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (!USE_JSON_SERVER && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${baseUrl}/items`, {
    headers,
  })
    .then(handleServerResponse)
    .then((data) => {
      console.log("API response:", data); // Debug API response
      return data;
    });
}

function postItems({ name, weather, imageUrl }, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Only add authorization header if using Express backend and token exists
  if (!USE_JSON_SERVER && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // For JSON server, generate a simple ID
  const body = USE_JSON_SERVER
    ? { id: Date.now(), name, weather, imageUrl }
    : { name, weather, imageUrl };

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).then(handleServerResponse);
}

function deleteItems(_id, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Only add authorization header if using Express backend and token exists
  if (!USE_JSON_SERVER && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
}

export function addCardLike(_id, userId, token, currentLikes = []) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

export function updateProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
}

export { getItems, postItems, deleteItems };

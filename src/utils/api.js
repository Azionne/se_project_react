// Configuration for different backends
import { EXPRESS_BASE_URL } from "../utils/constants"; // Express backend
const JSON_SERVER_BASE_URL = "http://localhost:3003"; // JSON server for testing

// Set this to true to use JSON server, false to use Express backend
const USE_JSON_SERVER = false; // Change to true to test with db.json

const baseUrl = USE_JSON_SERVER ? JSON_SERVER_BASE_URL : EXPRESS_BASE_URL;

export const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    // For 409 conflicts and other errors, try to get the error message from the response
    return res
      .json()
      .then((err) => {
        // If the server returned a message, use it
        if (err && err.message) {
          return Promise.reject(err.message);
        }
        // Otherwise, use a generic message with the status code
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(() => {
        // If we can't parse the JSON (or there's no JSON), use a status-based message
        if (res.status === 409) {
          return Promise.reject(
            "Email already exists. Please use a different email address."
          );
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }
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

  // For JSON server, let it generate its own ID and we'll map it to _id in the response
  const body = USE_JSON_SERVER
    ? {
        name,
        weather,
        imageUrl,
        likes: [], // Initialize likes array
      }
    : { name, weather, imageUrl };

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then(handleServerResponse)
    .then((item) => {
      // For JSON server, ensure the item has _id field matching id
      if (USE_JSON_SERVER && item.id && !item._id) {
        return { ...item, _id: item.id };
      }
      return item;
    });
}

function deleteItems(_id, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Only add authorization header if using Express backend and token exists
  if (!USE_JSON_SERVER && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // For JSON server, we need to find the item first to get its 'id' field
  if (USE_JSON_SERVER) {
    console.log("Deleting item with _id:", _id);
    // First get all items to find the one with matching _id or id
    return fetch(`${baseUrl}/items`)
      .then(handleServerResponse)
      .then((items) => {
        console.log(
          "All items:",
          items.map((item) => ({ id: item.id, _id: item._id }))
        );
        // Look for item by _id first, then by id if _id doesn't exist
        let item = items.find((item) => item._id == _id);
        console.log("Found by _id:", item);
        if (!item) {
          // If no _id match, try matching by id field
          item = items.find((item) => item.id == _id);
          console.log("Found by id:", item);
        }
        if (!item) {
          console.error(`Item with id ${_id} not found in items:`, items);
          throw new Error(`Item with id ${_id} not found`);
        }
        // Use the JSON server 'id' field for deletion
        const itemId = item.id;
        console.log("Using itemId for deletion:", itemId);
        return fetch(`${baseUrl}/items/${itemId}`, {
          method: "DELETE",
          headers,
        });
      })
      .then(handleServerResponse);
  } else {
    // Express backend uses _id directly
    return fetch(`${baseUrl}/items/${_id}`, {
      method: "DELETE",
      headers,
    }).then(handleServerResponse);
  }
}

function addCardLike(_id, userId, token, currentLikes = []) {
  console.log("addCardLike called with:", {
    _id,
    userId,
    token: !!token,
    currentLikes,
    baseUrl,
  });

  if (USE_JSON_SERVER) {
    // For JSON server, update the item's likes array
    const newLikes = currentLikes.includes(userId)
      ? currentLikes
      : [...currentLikes, userId];

    // JSON server uses 'id' in the URL, but our items use '_id'
    const itemId = _id;
    return fetch(`${baseUrl}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    }).then(handleServerResponse);
  } else {
    // Express backend
    console.log(
      "Making Express backend call:",
      `${baseUrl}/items/${_id}/likes`
    );
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleServerResponse)
      .then((response) => {
        // Express backend returns { data: item }, but we need just the item
        console.log("Express addCardLike response:", response);
        return response.data || response;
      });
  }
}

function removeCardLike(_id, userId, token, currentLikes = []) {
  console.log("removeCardLike called with:", {
    _id,
    userId,
    token: !!token,
    currentLikes,
    baseUrl,
  });

  if (USE_JSON_SERVER) {
    // For JSON server, update the item's likes array
    const newLikes = currentLikes.filter((id) => id !== userId);
    // JSON server uses 'id' in the URL, but our items use '_id'
    const itemId = _id;
    return fetch(`${baseUrl}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    }).then(handleServerResponse);
  } else {
    // Express backend
    console.log(
      "Making Express backend DELETE call:",
      `${baseUrl}/items/${_id}/likes`
    );
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleServerResponse)
      .then((response) => {
        // Express backend returns { data: item }, but we need just the item
        console.log("Express removeCardLike response:", response);
        return response.data || response;
      });
  }
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

export { getItems, postItems, deleteItems, addCardLike, removeCardLike };

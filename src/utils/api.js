const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleServerResponse)
    .then((data) => {
      console.log("API response:", data);
      return data;
    });
}

// Add token parameter
function postItems({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add this line
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(handleServerResponse);
}

// Add token parameter
function deleteItems(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add this line
    },
  }).then(handleServerResponse);
}

export function addCardLike(id, userId, token, currentLikes = []) {
  // Only add userId if not already present
  const updatedLikes = currentLikes.includes(userId)
    ? currentLikes
    : [...currentLikes, userId];

  return fetch(`${baseUrl}/items/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: updatedLikes,
    }),
  }).then((res) => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  });
}

export function removeCardLike(id, userId, token, currentLikes = []) {
  // Remove userId from the currentLikes array
  const updatedLikes = currentLikes.filter((like) => like !== userId);

  return fetch(`${baseUrl}/items/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: updatedLikes,
    }),
  }).then((res) => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  });
}

export { getItems, postItems, deleteItems };

const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      throw error;
    });
}

export { getItems };

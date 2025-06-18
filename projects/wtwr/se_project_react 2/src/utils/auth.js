const baseUrl = "http://localhost:3001";

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "An error has occured during registration"
      );
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "An error has occured during login");
    }
    return res.json();
  });
};
export const checkToken = (token) =>
  authRequest({
    endpoints: "users/me",
    method: "GET",
    token,
  });

const authRequest = ({
  endpoints,
  method = "GET",
  token = null,
  body = null,
}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${baseUrl}/${endpoints}`, {
    method,
    headers,
  }).then((res) => handleResponse(res, "Request failed"));
};

const handleResponse = (res, errorMessage) => {
  return res.ok ? res.json() : Promise.reject(`${errorMessage}: ${res.status}`);
};

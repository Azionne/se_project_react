import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // Ensure the path to App.jsx is correct
import "./blocks/index.css"; // Optional: Import global styles if needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

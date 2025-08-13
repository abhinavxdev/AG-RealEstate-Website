import React from "react";
import ReactDOM from "react-dom/client"; // Update this import
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);

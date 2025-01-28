import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/user/Home.jsx";
// import { AuthProvider } from "./context/AuthContext.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </BrowserRouter>
);

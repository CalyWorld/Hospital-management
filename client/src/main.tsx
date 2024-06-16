import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import { AdminUserProvider } from "./contexts/adminUserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminUserProvider>
      <App />
    </AdminUserProvider>
  </React.StrictMode>,
);

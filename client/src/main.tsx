import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { AdminUserProvider } from "./contexts/adminUserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AdminUserProvider>
        <App />
      </AdminUserProvider>
    </Provider>
  </React.StrictMode>,
);

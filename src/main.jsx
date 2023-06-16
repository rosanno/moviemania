import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <RouterProvider router={router} />
      </SkeletonTheme>
    </Provider>
  </React.StrictMode>
);

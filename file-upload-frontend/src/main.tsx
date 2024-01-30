import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Error from "./Error.tsx";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Uploader from "./Uploader.tsx";
import Display from "./Display.tsx";
import Tice from "./Tice.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/upload",
    element: <Uploader />,
  },
  {
    path: "/files",
    element: <Display />,
  },
  {
    path: "/exp",
    element: <Tice />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

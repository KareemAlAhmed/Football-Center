import * as React from "react";

import {
  createBrowserRouter
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Auth from "./Pages/Auth/Auth";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/auth/",
    children: [
        {
          path: "",
          element: <Auth />,
        },
        {
          path: ":slug",
          element: <Auth />,
        },
      ],
  }
]);
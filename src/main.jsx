import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CityWeather from "./pages/CityWeather";
import Forecast from "./pages/Forecast";
import Favorites from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "city/:name", element: <CityWeather /> },
      { path: "forecast/:name", element: <Forecast /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

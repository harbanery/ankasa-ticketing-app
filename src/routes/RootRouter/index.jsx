import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Explore from "../../pages/main/Explore";
import Layout from "../../pages/Layout";

const RootRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Explore /> },
        {
          path: "about",
          element: <h1>About</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRouter;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "../../pages/main/Explore";
import Login from "../../pages/auth/Login";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Register from "../../pages/auth/Register";
import LayoutMain from "../../pages/layout/LayoutMain";
import LayoutAuth, { authLoader } from "../../pages/layout/LayoutAuth";

const RootRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutMain />,
      children: [
        { index: true, element: <Explore /> },
        {
          path: "flight",
          element: <h1>Flight</h1>,
        },
      ],
    },
    {
      path: "/auth",
      element: <LayoutAuth />,
      loader: authLoader,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRouter;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "../../pages/main/Explore";
import Login from "../../pages/auth/Login";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Register from "../../pages/auth/Register";
import LayoutMain, { mainLoader } from "../../pages/layout/LayoutMain";
import LayoutAuth, { authLoader } from "../../pages/layout/LayoutAuth";
import FlightDetail from "../../pages/main/Flight";
import BoardingPassPage from "../../pages/main/BoardingPass";
import BrowsePage from "../../pages/main/Browse";
import ResetPassword from "../../pages/auth/ResetPassword";

const RootRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutMain />,
      loader: mainLoader,
      children: [
        { index: true, element: <Explore /> },
        {
          path: "browse",
          element: <BrowsePage />,
        },
        {
          path: "flight/:id",
          element: <FlightDetail />,
        },
        {
          path: "my-booking/:id",
          element: <BoardingPassPage />,
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
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRouter;

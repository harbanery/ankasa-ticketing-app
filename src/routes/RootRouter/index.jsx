import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  authLoader,
  mainLoader,
  profileLoader,
  protectedLoader,
  resetPasswordLoader,
  verifyEmailLoader,
} from "../../utils/loaders";
import Explore from "../../pages/main/Explore";
import Login from "../../pages/auth/Login";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Register from "../../pages/auth/Register";
import LayoutMain from "../../pages/layout/LayoutMain";
import LayoutAuth from "../../pages/layout/LayoutAuth";
import FlightDetail from "../../pages/main/Flight";
import BoardingPassPage from "../../pages/main/BoardingPass";
import BrowsePage from "../../pages/main/Browse";
import ResetPassword from "../../pages/auth/ResetPassword";
import Profile from "../../pages/main/Profile";
import Chat from "../../pages/main/Chat";
import ChatDetail from "../../pages/main/ChatDetail";
import MyProfile from "../../pages/main/Profile/myProfile";
import MyBooking from "../../pages/main/Profile/myBooking";

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
          loader: protectedLoader,
        },
        {
          path: "my-booking/:id",
          element: <BoardingPassPage />,
          loader: protectedLoader,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: profileLoader,
          children: [
            {
              path: "my-profile",
              element: <MyProfile />,
            },
            {
              path: "my-booking",
              element: <MyBooking />,
            },
          ],
        },
        {
          path: "chat",
          element: <Chat />,
          loader: protectedLoader,
          children: [
            {
              path: ":id",
              element: <ChatDetail />,
            },
          ],
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
          loader: resetPasswordLoader,
        },
        {
          path: "email-verification",
          loader: verifyEmailLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRouter;

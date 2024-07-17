import React from "react";
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Explore from "../../pages/main/Explore";
import Layout from "../../pages/Layout";
import ProtectedRoute from "../ProtectedRoute";

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
    {
      path: "/auth",
      element: <ProtectedRoute />,
      loader: ({ request }) => {
        console.log(request.url);
        const url = new URL(request.url);
        const pathname = url.pathname;
        // console.log(url);
        if (pathname == "/auth") {
          return redirect("/auth/login");
        }
        return null;
        // return redirect("/auth/login");
      },
      children: [
        {
          path: "login",
          element: <h1>Login</h1>,
        },
        {
          path: "register",
          element: <h1>Sign Up</h1>,
        },
        {
          path: "forgot_password",
          element: <h1>Forgot Password</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRouter;

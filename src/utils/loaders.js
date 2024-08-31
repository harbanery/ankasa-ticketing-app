import { redirect } from "react-router-dom";
import api from "../services/api";
import {
  getTokenfromLocalStorage,
  removeTokenfromLocalStorage,
} from "./localStorage";

export const authLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const { token } = getTokenfromLocalStorage();
  // const previousPage = document.referrer;
  // console.log(`${previousPage}`);

  if (pathname == "/auth") {
    return redirect("/auth/register");
  }

  if (token) {
    return redirect("/");
    // const redirectTo =
    //   document.referrer !== window.location.origin + "/"
    //     ? "/"
    //     : document.referrer;
    // return { redirectTo };
    // if (previousPage !== window.location.origin + "/") {
    //   return redirect("/");
    // } else {
    //   return redirect(-1);
    // }
  }

  return null;
};

export const profileLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const { token } = getTokenfromLocalStorage();

  if (pathname == "/profile") {
    return redirect("/profile/my-profile");
  }

  if (!token) {
    return redirect("/");
  }

  return null;
};

export const mainLoader = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const { token } = getTokenfromLocalStorage();

  // if (pathname == "/auth") {
  //   return redirect("/auth/register");
  // }

  if (token) {
    try {
      const [responseProfile, responseChat] = await Promise.all([
        api.get(`customer/profile`),
        api.get("chats"),
      ]);

      return {
        data: {
          profile: responseProfile.data,
          chats: responseChat.data,
        },
        token: token,
      };
    } catch (error) {
      console.error("Error fetching profile data", error);
      removeTokenfromLocalStorage();
    }
  }

  return { data: {}, token: "" };
};

export const verifyEmailLoader = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const user_id = params.get("id");
  const user_token = params.get("token");

  if (!user_token || !user_id) {
    console.error("Unknown id or token from email verification.");
    return redirect("/");
  } else {
    try {
      await api.get(`verify`, {
        params: {
          id: user_id,
          token: user_token,
        },
      });

      return redirect("/auth/login");
    } catch (error) {
      console.error("Error fetching profile data", error);
      return redirect("/");
    }
  }
};

export const resetPasswordLoader = ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const user_id = params.get("id");
  const user_token = params.get("token");
  // const params = url.search;
  // console.log(params);

  if (!user_token || !user_id) {
    return redirect("/auth/login");
  }

  return { user_id, user_token };
};

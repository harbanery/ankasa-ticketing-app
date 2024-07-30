import { redirect } from "react-router-dom";
import { getTokenfromLocalStorage } from "./localStorage";

export const protectedRoute = () => {
  // const token = localStorage
  const { token } = getTokenfromLocalStorage();
  if (!token) {
    return redirect("/auth/login");
  }
  return null;
};

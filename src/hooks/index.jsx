import { useEffect, useState } from "react";
import { getTokenfromLocalStorage } from "../utils/localStorage";

export function useProfile() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const token = getTokenfromLocalStorage();

  useEffect(() => {
    async function getProfile() {
      try {
        setStatus("loading");
        let profile = null;
        if (role === "seller") {
          profile = await getSellerProfile(token);
        } else if (role === "customer") {
          profile = await getCustomerProfile(token);
        }
        if (profile !== null) {
          setData(profile.data);
          setStatus("success");
        }
      } catch (error) {
        setStatus("failed");
        console.log("error while retrieving profile >", error);
        setError(error);
      }
    }

    getProfile();
  }, []);

  return { data, status, error };
}

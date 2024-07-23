import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Outlet, redirect } from "react-router-dom";
import { getTokenfromLocalStorage } from "../../../utils/localStorage";

const LayoutAuth = () => {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <Box h={{ md: "100vh" }}>
      <Flex w="100%" h="100%">
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          w={{ base: "70%", lg: "100%" }}
          bg="#2395FF"
        >
          <Image
            src={"/src/assets/illustration.png"}
            alt="Ankasa Planes"
            w="50%"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
          w={{ base: "100%", xl: "70%" }}
          bg="white"
          position="relative"
          pt={{ base: 28, md: 16 }}
        >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

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

// export const AuthWrapper = ({ children }) => {
//   const loaderData = useLoaderData();

//   if (loaderData && loaderData.redirectTo) {
//     return <Navigate to={loaderData.redirectTo} replace={true} />;
//   }

//   return children;
// };

export default LayoutAuth;

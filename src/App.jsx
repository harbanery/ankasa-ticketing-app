import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Fonts from "./styles/fonts";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import { createBrowserRouter } from "react-router-dom";
import RootRouter from "./routes/RootRouter";

function App() {
  return (
    <RootRouter/>
    // <>
    //   <Fonts />
    //   <Container>
    //     <Stack
    //       fontFamily="myHeading"
    //       fontSize={70}
    //       fontWeight={100}
    //       fontStyle={"italic"}
    //     >
    //       <Heading>ANKASA</Heading>
    //       <Text>ANKASA</Text>
    //       <Text fontFamily="myBody" fontSize={40} fontStyle={"normal"}>
    //         ANKASA
    //       </Text>
    //     </Stack>
    //   </Container>
    // </>
  );
}

export default App;

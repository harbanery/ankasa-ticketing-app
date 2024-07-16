import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import theme from "./styles/themes";
import { StrictMode } from "react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);

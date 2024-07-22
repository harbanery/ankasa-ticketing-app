import { extendTheme, theme as base } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  Poppins: `'Poppins', sans-serif`,
  Lato: `'Lato', sans-serif`,
};

const theme = extendTheme({ fonts, colors });

export default theme;

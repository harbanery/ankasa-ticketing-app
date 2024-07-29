import { extendTheme } from "@chakra-ui/react";

const colors = {};

const fonts = {
  Poppins: `'Poppins', sans-serif`,
  Lato: `'Lato', sans-serif`,
};

const styles = {
  global: {
    "input::-ms-reveal, input::-ms-clear": {
      display: "none",
    },
  },
};

const theme = extendTheme({ fonts, colors, styles });

export default theme;

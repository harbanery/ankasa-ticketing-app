import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  myHeading: `'Poppins', ${base.fonts?.heading}, sans-serif`,
  myBody: `'Poppins', ${base.fonts?.body}, sans-serif`,
};

const theme = extendTheme({ fonts });

export default theme;

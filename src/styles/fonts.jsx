import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Lato';
        font-weight: 100 900;
        font-display: swap;
        src: url("/fonts/Lato-Regular.ttf") format("truetype");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: "Cuba";
        font-weight: 100 900;
        font-display: swap;
        src: url("/fonts/Poppins-Regular.ttf") format("truetype");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
        U+FEFF, U+FFFD;
      }
        @font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiAyp8kv8JHgFVrJJLmE0tMMPKzSQ.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiAyp8kv8JHgFVrJJLmE0tCMPI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
  @font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrLPTufntAKPY.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrLPTucHtA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmv1pVGdeOcEg.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmv1pVF9eO.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
      `}
  />
);

export default Fonts;

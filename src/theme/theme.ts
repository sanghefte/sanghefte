import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: "semibold", // Normally, it is "semibold"
      },
    },
    Input: {
      baseStyle: {
        alignItems: "center",
      },
    },
  },
});

export default theme;

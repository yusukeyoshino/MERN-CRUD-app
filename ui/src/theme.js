import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 380,
      md: 600,
      lg: 1280,
      xl: 1920,
    },
  },
});

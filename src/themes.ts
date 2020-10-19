import { createMuiTheme } from "@material-ui/core";

export const theme = {
    background: "#FBF4ED",
    primary: "#92CBA9",
    secondary: "#695849",
    lightGray: "#909090",
};

export const mdTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.primary,
      },
      secondary: {
        main: theme.secondary,
      },
    },
  });
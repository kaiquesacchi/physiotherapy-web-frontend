import { createMuiTheme } from "@material-ui/core";

export const theme = {
  background: "#FBF4ED",
  primary: "#92CBA9",
  secondary: "#75675a",
  lightGray: "#909090",
};

export const mdTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.primary,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: theme.secondary,
    },
  },
});

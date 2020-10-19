import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages";

import { ThemeProvider } from "styled-components";
import { ThemeProvider as ThemeProviderMD } from "@material-ui/core";
import { theme, mdTheme } from "./themes";

import { SnackBar } from "./components/SnackBar";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ThemeProviderMD theme={mdTheme}>
      <SnackBar>
        <App />
      </SnackBar>
    </ThemeProviderMD>
  </ThemeProvider>,
  document.getElementById("root")
);

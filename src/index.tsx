import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages";

import { ThemeProvider } from "styled-components";
import theme from "./themes";

import { SnackBar } from "./components/SnackBar";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackBar>
      <App />
    </SnackBar>
  </ThemeProvider>,
  document.getElementById("root")
);

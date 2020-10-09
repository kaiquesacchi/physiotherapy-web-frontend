import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages";

import { SnackBar } from "./components/SnackBar";

ReactDOM.render(
  <SnackBar>
    <App />
  </SnackBar>,
  document.getElementById("root")
);

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
      </Switch>
    </Router>
  );
}

export default App;

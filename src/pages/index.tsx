import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyVideos from "./MyVideos";
import MyPatients from "./MyPatients";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/my-videos" component={MyVideos}></Route>
        <Route path="/my-patients" component={MyPatients}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyVideos from "./MyVideos";
import MyPatients from "./MyPatients";
import AuthService from "../services/Auth";

function PrivateRoute({ component, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      component={AuthService.isAuthenticated() ? component : () => <Redirect to={{ pathname: "/sign-in" }} />}
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/my-videos" component={MyVideos} />
        <PrivateRoute path="/my-patients" component={MyPatients} />
        <Route
          path="*"
          component={() => (
            <Redirect
              to={{
                pathname: AuthService.isAuthenticated()
                  ? AuthService.getUserType() === "Patient"
                    ? "my-videos"
                    : "my-patients"
                  : "/sign-in",
              }}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route
} from "react-router-dom";

import Login from "./components/Login/Login";

import Signup from "./components/Signup/Signup";
import Welcome from "./components/Welcome/Welcome";


import RegisterForm from "./components/Voluntary/Voluntary";
import Search from "./Search";
import Profile from "./components/Home/Profile"
import Home from "./components/Home/Home"
import Activity from "./components/Home/Activity"
import Challenge from "./components/Challenges/Challenge"
import Footer from "./Footer"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { fb } from "./firebaseData";
import Logo from "./assets/loginLogo.png";
import { Provider, connect } from "react-redux";
import { store } from "./store/store"
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://cf1825bd44ef450eb5c8043025094a32@sentry.io/1531896"
});


const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fb.auth().currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const HomeApp = ({ match }) => {
  return (
    <Router>
      <div className="App">
        <div
          className="slim-header"
          style={{ backgroundColor: "#20498B", padding: 20 }}
        >
          <div className="container">
            <div className="text-center" style={{ paddingTop: 5 }}>
              <h2 className="slim-logo">
                <a href="/">
                  <img src={Logo} alt="" style={{ width: 250 }} />
                </a>
              </h2>
            </div>
          </div>
        </div>
        <div className="slim-mainpanel">
          <div>
            <PrivateRoute exact path="/welcome" component={Welcome} />

          </div>
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/challenge:id" component={Challenge} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/join" component={RegisterForm} />

          </div>
        </div>
      </div>
    </Router>
  );
};

const Root = () => (
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <HomeApp />
    </AlertProvider>
  </Provider>
);

export default Root;

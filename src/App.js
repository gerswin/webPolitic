import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route
} from "react-router-dom";

import Login from "./Login/Login";
import Form2 from "./Form2";

import Signup from "./Signup/Signup";
import Welcome from "./Welcome/Welcome";


import Form from "./Form";
import Search from "./Search";
import Profile from "./components/Home/Profile"
import Home from "./components/Home/Home"
import Activity from "./components/Home/Activity"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { fb } from "./firebaseData";
import Logo from "./assets/loginLogo.png";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import reducer from "./store/reducers";
import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://cf1825bd44ef450eb5c8043025094a32@sentry.io/1531896"
});

const initialState = {
  userCount: 0,
  userInfo: {
    userData: {
      name: "Nombre"
    }
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
            <Route exact path="/welcome" component={Welcome} />

          </div>
          <div className="container">
            <Route exact path="/" component={Form2} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/form" component={Form} />
            <PrivateRoute exact path="/search" component={Search} />
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

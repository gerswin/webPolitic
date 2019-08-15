import React from "react";
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";



import Login from "./Login"
import Form2 from "./Form2"
import Profile from "./components/Home/Profile"

import Form from "./Form"
import Search from "./Search"

import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import {positions, Provider as AlertProvider, transitions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {fb} from "./firebaseData";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fb.auth().currentUser
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)



const HomeApp = ({ match }) => {
  return (
      <Router>
        <div className="App">
          <div className="slim-header" style={{backgroundColor:"#20498B",padding:30}}>
            <div className="container">
              <div className="text-center" style={{paddingTop:20}}>
                <h2 className="slim-logo">
                  <a href="/">
                    <img src="https://alfredoramos.co/img/logo.svg" alt=""/>
                  </a>
                </h2>

                {/* search-box */}
              </div>
              {/* slim-header-left */}

              {/* header-right */}
            </div>
            {/* container */}
          </div>

          {/* slim-navbar */}
          <div className="slim-mainpanel">
            <div className="container">
                <Route exact path="/" component={Form2} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/form" component={Form} />
                <PrivateRoute exact path="/search" component={Search} />
            </div>
          </div>
          {/* slim-navbar */}
        </div>
      </Router>
  );
};


const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
      <HomeApp />
    </AlertProvider>
)

export default Root;


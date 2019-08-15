import React, { Component } from "react";
import { fb, db } from "../firebaseData";
import { withAlert } from "react-alert";
import { Field, Form } from "react-final-form";
import { loginUser, setPeopleCount } from "../store/actions";
import { connect } from "react-redux";
import * as Sentry from "@sentry/browser";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={value => {
            const that = this;
            const { dispatch } = this.props;
            let email = value.email.toLowerCase().trim();
            let password = value.password.toLowerCase().trim();

            fb.auth()
              .signInWithEmailAndPassword(email, password)
              .then(function(result) {
                //TODO remove localstorage
                localStorage.setItem("currentMaster", email);
                const people = db
                  .collection("personas")
                  .doc(email)
                  .get()
                  .then(function(querySnapshot) {
                    dispatch(
                      loginUser({
                        ...querySnapshot.data(),
                        image: querySnapshot.data().avatar
                          ? querySnapshot.data().avatar
                          : "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
                        userRole: querySnapshot.data().role
                      })
                    );
                  })
                  .catch(function(error) {
                    Sentry.captureException(error);
                  });

                // fetch user record count
                const peopleCount = db
                  .collection("personas")
                  .where("master", "==", email)
                  .get()
                  .then(function(querySnapshot) {
                    dispatch(setPeopleCount(querySnapshot.size));
                  })
                  .catch(function(error) {
                    Sentry.captureException(error);
                  });

                Promise.all([people, peopleCount]).then(function(values) {
                  that.props.history.push(`/`);
                });
              })
              .catch(function(error) {
                // Handle Errors here.
                console.log(error);

                that.props.alert.show("Error!");
              });
          }}
          validate={() => {}}
          render={({ handleSubmit, form: {}, pristine, invalid, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="signin-wrapper" style={{ paddingTop: 100 }}>
                <div className="signin-box">
                  <h3
                    className="signin-title-secondary"
                    style={{ paddingBottom: 30 }}
                  >
                    Escribe tu usuario y contraseña para continuar.
                  </h3>
                  <div className="form-group">
                    <Field
                      name="email"
                      component="input"
                      className={"form-control"}
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group mg-b-50">
                    <Field
                      name="password"
                      component="input"
                      type={"password"}
                      className={"form-control"}
                      placeholder="password"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={pristine || invalid}
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
const LoginPre = connect()(Login);
export default withAlert()(LoginPre);

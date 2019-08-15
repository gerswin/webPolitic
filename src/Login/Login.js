import React, { Component } from "react";
import { fb,db } from "../firebaseData";
import { withAlert } from "react-alert";
import { Field, Form } from "react-final-form";
import { loginUser, setPeopleCount } from "../store/actions";

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
            let email = value.email.toLowerCase().trim();
            let password =  value.password.toLowerCase().trim();

            fb.auth()
              .signInWithEmailAndPassword(
                email,
                password
              )
              .then(function(result) {
                console.log(result);
                localStorage.setItem("currentMaster", email);
                that.props.history.push(`/`);

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

                    global.userData = querySnapshot.data();
                    global.image = querySnapshot.data().avatar
                      ? querySnapshot.data().avatar
                      : "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg";
                    global.userRole = querySnapshot.data().role;
                  })
                  .catch(function(error) {
                    //Sentry.captureException(error);
                  });

                // fetch user record count
                const peopleCount = db
                  .collection("personas")
                  .where("master", "==", email)
                  .get()
                  .then(function(querySnapshot) {
                    global.peopleCount = querySnapshot.size;
                    dispatch(setPeopleCount(querySnapshot.size));
                  })
                  .catch(function(error) {
                    //Sentry.captureException(error);
                  });

                Promise.all([people, peopleCount]).then(function(values) {
                  navigation.navigate("Drawer", { email: email });
                });
              })
              .catch(function(error) {
                // Handle Errors here.
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                that.props.alert.show("Error!");
              });
          }}
          validate={() => {}}
          render={({ handleSubmit, form: {}, pristine, invalid, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="signin-wrapper">
                <div className="signin-box">
                  <h2 className="signin-title-primary">Hola!</h2>
                  <h3 className="signin-title-secondary">
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
                    Sign In
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

export default withAlert()(Login);

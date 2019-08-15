import React, {Component} from "react";
import {fb} from "./firebaseData";
import {withAlert} from 'react-alert'
import {Field, Form} from "react-final-form";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div>
                <Form
                    onSubmit={(value) => {
                        const that = this;
                        fb.auth()
                            .signInWithEmailAndPassword(value.email, value.password)
                            .then(function (result) {
                                console.log(result)
                                localStorage.setItem("currentMaster",value.email)
                                that.props.history.push(`/`)


                            })
                            .catch(function (error) {
                                // Handle Errors here.
                                console.log(error);
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                that.props.alert.show("Error!");

                            });

                    }}

                    validate={() => {
                    }}

                    render={({
                                 handleSubmit,
                                 form: {},
                                 pristine,
                                 invalid,
                                 values
                             }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="signin-wrapper">
                                <div className="signin-box">
                                    <h2 className="signin-title-primary">Hola!</h2>
                                    <h3 className="signin-title-secondary">Escribe tu usuario y contraseña para
                                        continuar.</h3>
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
                                    <button className="btn btn-primary btn-block" type="submit"
                                            disabled={pristine || invalid}>Sign In
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


export default withAlert()(Login)



import React, { Component } from "react";
import {signIn, getAccountInfo, avatar, countNetwork} from "../../firebaseData";
import { withAlert } from "react-alert";
import { Field, Form } from "react-final-form";
import { loginUser, setPeopleCount,setPeopleNetCount } from "../../store/actions";
import { connect } from "react-redux";
import colors from "../../globals/colors";
import {compose} from "redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    goSignup = () => {
        this.props.history.push(`/signup`);
    };
    componentDidMount() {
        const { dispatch } = this.props;

        if (this.props.userEmail){
            signIn(this.props.userEmail, this.props.userIdenty).then(item=>{

                return countNetwork(this.props.userEmail);
            }) .then(value => {
                console.log(value)
                dispatch(setPeopleCount(value.level1));
                dispatch(setPeopleNetCount(value.level2));

                this.props.history.push(`/home`);

            })
        }
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
                        signIn(email, password)
                            .then(value => {
                                return getAccountInfo(email);
                            })
                            .then(value => {
                                dispatch(
                                    loginUser({
                                        ...value,
                                        image: value.avatar
                                            ? value.avatar
                                            : avatar,
                                        userRole: value.role
                                    })
                                );
                                return countNetwork(email);
                            })
                            .then(value => {
                                console.log(value)
                                dispatch(setPeopleCount(value.level1));
                                dispatch(setPeopleNetCount(value.level2));

                                that.props.history.push(`/home`);

                            })
                            .catch(error => {
                                console.log(error)
                                that.props.alert.show("Datos invalidos!");
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
                                            placeholder="Correo Electronico"
                                        />
                                    </div>
                                    <div className="form-group mg-b-50">
                                        <Field
                                            name="password"
                                            component="input"
                                            type={"password"}
                                            className={"form-control"}
                                            placeholder="Cedula"
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        style={{
                                            backgroundColor: colors.green,
                                            borderColor: colors.green
                                        }}
                                        disabled={pristine || invalid}
                                    >
                                        Entrar
                                    </button>
                                </div>
                                <div
                                    className={"text-center"}
                                    style={{ marginTop: 20, cursor: "pointer" }}
                                >
                                  <span
                                      onClick={this.goSignup}
                                      className={"text-center"}
                                      style={{ cursor: "pointer" }}
                                  >
                                    Registrarse
                                  </span>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userEmail: state.email,
    userIdenty: state.cc
});

export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        null
    )
)(Login)



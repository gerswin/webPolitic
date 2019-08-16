import React, {Component} from "react";
import {withAlert} from "react-alert";
import {Field, Form} from "react-final-form";
import Search from "../Search";
import {signup, saveUserData, avatar} from "../../firebaseData";

import {Col, Container, Row} from "reactstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import zones from "../../m";
import {loginUser} from "../../store/actions";
import {connect} from "react-redux";
import colors from "../../globals/colors";

let result = [];
let index = 1;
for (const item of zones) {
    index = index + 1;
    result.push({
        id: index,
        name: item,
        value: item
    });
}

const required = value => (value ? undefined : "Required");

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 1,
            address: "",
            location: [
                {
                    value: ""
                }
            ]
        };
    }

    componentDidMount() {
    }

    render() {
        const {currentUser} = this.state;
        const {dispatch} = this.props;
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <Form
                            onSubmit={({address, cc, name, phone, location, email}) => {
                                const that = this;
                                const parent = "alfredoRamos";
                                signup(email, cc).then(value => {
                                    const payload = {
                                        client: parent,
                                        name: name,
                                        cc: cc,
                                        location: location[0].value,
                                        email: email.toLowerCase().trim(),
                                        phone: phone,
                                        parent: parent,
                                        address: address,
                                        role: currentUser,
                                        master: parent,
                                        created: new Date().getTime()
                                    }
                                    dispatch(
                                        loginUser({
                                            ...payload,
                                            image: avatar,
                                            userRole: payload.role
                                        })
                                    );
                                    return saveUserData(payload)
                                }).then(value => {

                                    that.props.history.push(`/welcome`);
                                }).catch(item => {
                                    that.props.alert.show("Error!");
                                })

                            }}
                            mutators={{
                                setAddress: (args, state, utils) => {
                                    utils.changeValue(state, "address", () => this.state.address);
                                },
                                setLocation: (args, state, utils) => {
                                    utils.changeValue(
                                        state,
                                        "location",
                                        () => this.state.location
                                    );
                                }
                            }}
                            validate={() => {
                            }}
                            render={({
                                         handleSubmit,
                                         reset,
                                         form: {
                                             mutators: {setAddress, setLocation}
                                         },
                                         pristine,
                                         invalid,
                                         values
                                     }) => (
                                <form onSubmit={handleSubmit}>
                                    <br/>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div>
                                                <label>Nombre Apellido</label>
                                                <Field
                                                    name="name"
                                                    validate={required}
                                                    component="input"
                                                    className={"form-control"}
                                                    placeholder="Nombre / Apellido"
                                                />
                                            </div>
                                            <div>
                                                <label style={{marginBottom: 2, marginTop: 10}}>
                                                    CC
                                                </label>
                                                <Field
                                                    name="cc"
                                                    validate={required}
                                                    component="input"
                                                    className={"form-control"}
                                                    placeholder="CC"
                                                />
                                            </div>
                                            <div>
                                                <label style={{marginBottom: 2, marginTop: 10}}>
                                                    Localidad
                                                </label>
                                                <Search
                                                    className={"form-control"}
                                                    onItemsChanged={value => {
                                                        this.setState(
                                                            {
                                                                location: value
                                                            },
                                                            () => {
                                                                setLocation();
                                                            }
                                                        );
                                                    }}
                                                    items={result}
                                                    placeholder={"Selecciona"}
                                                />
                                            </div>
                                            <div>
                                                <label style={{marginBottom: 2, marginTop: 10}}>
                                                    Email
                                                </label>
                                                <Field
                                                    validate={required}
                                                    name="email"
                                                    component="input"
                                                    type={"email"}
                                                    className={"form-control"}
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div>
                                                <label style={{marginBottom: 2, marginTop: 10}}>
                                                    Telefono
                                                </label>
                                                <Field
                                                    validate={required}
                                                    name="phone"
                                                    component="input"
                                                    className={"form-control"}
                                                    placeholder="Telefono"
                                                />
                                            </div>
                                            <div>
                                                <label style={{marginBottom: 2, marginTop: 10}}>
                                                    Direccion
                                                </label>
                                                <GooglePlacesAutocomplete
                                                    inputClassName={"form-control"}
                                                    onSelect={({description}) => {
                                                        this.setState(
                                                            {
                                                                address: description
                                                            },
                                                            () => {
                                                                setAddress();
                                                            }
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <button
                                        className="btn btn-primary btn-block mg-b-10"
                                        type="submit"
                                        style={{
                                            backgroundColor: colors.green,
                                            borderColor: colors.green
                                        }}
                                        disabled={pristine || invalid}
                                    >
                                        Guardar
                                    </button>
                                </form>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}



const SignupPre = connect()(Signup);
export default withAlert()(SignupPre);


import React, {Component} from "react";
import {withAlert} from "react-alert";
import {Field, Form} from "react-final-form";
import Search from "../Search";

import {Col, Container, Row} from "reactstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {saveUserData, signUpAlt} from "../../firebaseData"
import zones from "../../m";
import colors from "../../globals/colors";
import {connect} from "react-redux";
import SweetAlert from 'sweetalert2-react';
import { compose } from 'redux'

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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const required = value => (value ? undefined : "Required");

class Voluntary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 1,
            address: "",
            showMsg:false,
            lockButton:false,
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
        const {userEmail} = this.props;
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <SweetAlert
                            show={this.state.showMsg}
                            title= {'Voluntario registrado'}
                            text= {"Gracias"}
                            type={'success'}
                            showCancelButton={false}
                            confirmButtonText={'Aceptar'}
                            cancelButtonText={'No'}
                            onCancel={() => this.setState({ showMsg: false })}
                            onConfirm={() => this.setState({ showMsg: false })}
                        />
                        <Form
                            onSubmit={({address, cc, name, phone, location, email}) => {
                                const parent = "alfredoRamos";
                                const payload = {
                                    client: parent,
                                    name: name,
                                    cc: cc,
                                    location: location[0].value,
                                    email: email.toLowerCase().trim(),
                                    phone: phone,
                                    parent: userEmail,
                                    address: address,
                                    role: 3,
                                    master: parent,
                                    created: new Date().getTime()
                                }
                                saveUserData(payload).then(() => {
                                    return signUpAlt(email, cc)
                                }).then(() => {
                                    this.setState({ showMsg: true })
                                })
                                    .catch(error => {
                                    console.error(error)
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
                            initialValues={{

                         /*       address: "Calle 12",
                                cc: "16745665",
                                name: "gerswin",
                                phone: "30578659911",
                                location: [{value: "Pablo Escobar"}],
                                email: `${makeid(10)}@mas57.co`*/
                            }}
                            render={({
                                         handleSubmit,
                                         reset,
                                         form: {
                                             mutators: {setAddress, setLocation}
                                         },
                                         pristine,
                                         initialValues,

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

const mapStateToProps = state => ({
    userEmail: state.userInfo.email,
});

export default compose(
    withAlert(),
    connect(
        mapStateToProps,
        null
    )
)(Voluntary)


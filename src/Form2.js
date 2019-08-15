import React, {Component} from "react";
import {db} from "./firebaseData";
import {Provider as AlertProvider, withAlert} from 'react-alert'
import {Field, Form} from 'react-final-form'

import {Col, Container, Jumbotron, Row, Button, ButtonGroup, ListGroup} from 'reactstrap';
import setFieldData from 'final-form-set-field-data'
import AlertTemplate from "react-alert-template-basic";
import validate from './validate';

const required = value => (value ? undefined : "Required");

const SelectParent = ({history}) => (
    <div style={{ cursor: 'pointer' }} >
        Seleccionar
    </div>
)


const constraints = {
    name: {
        presence: {
            allowEmpty: false,
        },
    },
    cc: {
        presence: {
            allowEmpty: false,
        },
    },
    location: {
        presence: {
            allowEmpty: false,
        },
    },
    phone: {
        presence: {
            allowEmpty: false,
        },
    },
    address: {
        presence: {
            allowEmpty: false,
        },
    },
    email: {
        presence: {
            allowEmpty: false,
        },
        email: true,
    },
};


class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 3
        };
    }

    componentDidMount() {
    }

    render() {
        const {currentUser} = this.state
        return (
            <Container>

                <Row>
                    <Col sm="3" md="3"></Col>
                    <Col xs="12" sm="6" md="6">
                        <Form
                            onSubmit={({address,cc,name,phone,location,email}) => {
                                const that = this;
                                db.collection('personas')
                                    .doc(email.toLowerCase())
                                    .set({
                                        name: name,
                                        cc: cc,
                                        location: location,
                                        email: email.toLowerCase(),
                                        phone: phone,
                                        parent:  "web@bogotanosune.com",
                                        address: address,
                                        role: currentUser,
                                        master: "web@bogotanosune.com",
                                        created:new Date().getTime()
                                    })
                                    .then(function () {
                                        that.props.alert.show("Exito! ");
                                        fetch('https://us-central1-angelabogota-11a6c.cloudfunctions.net/widgets', {
                                            method: 'post',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({"user": email.toLowerCase(), "password": cc})
                                        });

                                    })

                                    .catch(function (error) {

                                        console.error('Error writing document: ', error);
                                    });
                            }}
                            mutators={{
                                setConst: (args, state, utils) => {
                                    utils.changeValue(state, 'currentUser', () => 1)
                                },
                                setMovil: (args, state, utils) => {
                                    utils.changeValue(state, 'currentUser', () => 2)
                                },
                                setAct: (args, state, utils) => {
                                    utils.changeValue(state, 'currentUser', () => 3)
                                },

                            }}
                            validate={() => {
                            }}
                            initialValues={{
                                currentUser:1
                            }}
                            render={({
                                 handleSubmit,
                                         reset,
                                         form: {
                                             mutators: { setMovil, setConst,setAct }
                                         },
                                 pristine,
                                         initialValues,
                                 invalid,
                                 values,

                                     }) => (
                                <form onSubmit={handleSubmit}>
                                    <br/>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm">
                                            {/*<div className={"text-center mt-1 mb-3"}>*/}
                                            {/*    <ButtonGroup>*/}
                                            {/*        <Button*/}
                                            {/*            className={values.currentUser ===1 ? "activeBtn" : ""}*/}
                                            {/*            onClick={setConst}*/}
                                            {/*        >Constructor</Button>*/}
                                            {/*        <Button*/}
                                            {/*            className={values.currentUser ===2 ? "activeBtn" : ""}*/}
                                            {/*            onClick={setMovil}*/}
                                            {/*        >Movilizador</Button>*/}
                                            {/*        <Button*/}
                                            {/*            className={values.currentUser ===3 ? "activeBtn" : ""}*/}
                                            {/*            onClick={setAct}*/}
                                            {/*        >Activista</Button>*/}
                                            {/*    </ButtonGroup>*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                            {/*    <Jumbotron style={{paddingLeft: 15,paddingTop:10, paddingBottom:3}}>*/}
                                            {/*        <p onClick={()=>{ this.props.history.push('/search') }} style={{ cursor: 'pointer' }}>{localStorage.getItem("selectedUser") !== null ? JSON.parse(localStorage.getItem("selectedUser")).email : <SelectParent history={this.props.history}/>}</p>*/}
                                            {/*    </Jumbotron>*/}
                                            {/*</div>*/}
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
                                                <label>CC</label>
                                                <Field
                                                    name="cc"
                                                    validate={required}

                                                    component="input"
                                                    className={"form-control"}
                                                    placeholder="CC"
                                                />
                                            </div>
                                            <div>
                                                <label>Localidad</label>
                                                <Field name="location"
                                                       validate={required}
                                                       component="select"
                                                       className={"form-control"}>
                                                    <option value="">Seleccione</option>
                                                    <option value="Usaquén">Usaquén</option>
                                                    <option value="Chapinero">Chapinero</option>
                                                    <option value="Santa Fe">Santa Fe</option>
                                                    <option value="San Cristóbal">San Cristóbal</option>
                                                    <option value="Usme">Usme</option>
                                                    <option value="Tunjuelito">Tunjuelito</option>
                                                    <option value="Bosa">Bosa</option>
                                                    <option value="Kennedy">Kennedy</option>
                                                    <option value="Fontibón">Fontibón</option>
                                                    <option value="Engativá">Engativá</option>
                                                    <option value="Suba">Suba</option>
                                                    <option value="Barrios Unidos">Barrios Unidos</option>
                                                    <option value="Teusaquillo">Teusaquillo</option>
                                                    <option value="Los Mártires">Los Mártires</option>
                                                    <option value="Antonio Nariño">Antonio Nariño</option>
                                                    <option value="Puente Aranda">Puente Aranda</option>
                                                    <option value="La Candelaria">La Candelaria</option>
                                                    <option value="Rafael Uribe Uribe">Rafael Uribe Uribe</option>
                                                    <option value="Ciudad Bolívar">Ciudad Bolívar</option>
                                                    <option value="Sumapaz">Sumapaz</option>
                                                </Field>
                                            </div>
                                            <div>
                                                <label>Email</label>
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
                                                <label>Telefono</label>
                                                <Field
                                                    validate={required}
                                                    name="phone"
                                                    component="input"
                                                    className={"form-control"}
                                                    placeholder="Telefono"
                                                />
                                            </div>
                                            <div>
                                                <label>Direccion</label>
                                                <Field
                                                    validate={required}
                                                    name="address"
                                                    component="input"
                                                    className={"form-control"}
                                                    placeholder="Direccion"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <button className="btn btn-primary btn-block mg-b-10" type="submit"
                                            disabled={pristine || invalid}>
                                        Guardar
                                    </button>

                                </form>
                            )}
                        />
                    </Col>
                    <Col sm="3" md="3"></Col>

                </Row>

            </Container>
        );
    }
}


export default withAlert()(Welcome)



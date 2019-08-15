import React, {useEffect, useState} from 'react';
import {db} from './firebaseData';
import Fuse from "fuse.js";
import {Button, ButtonGroup, Col, Container, Jumbotron, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Field, Form} from "react-final-form";


const SelectPerson = ({history}) => {
    const [currentUser, setCurrentUser] = useState(1);
    const [fullPersons, setFullPersons] = useState([]);
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);

    const options = {
        keys: ['email', 'name', 'phone', 'cc']
    }
    const fuse = new Fuse(fullPersons, options)
    const getData = (role = 1) => {
        let people = [];
        setLoading(true)

        db.collection("personas").where("role", "==", role)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    people.push(doc.data())
                    setLoading(false)

                });
                setPersons(people)
                setFullPersons(people)

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }


    const onSelect = (item) => {
        localStorage.setItem('selectedUser', JSON.stringify(item));
        history.push('/')



    }

    useEffect(() => getData(), []);

    return (

        <Container>

            <Row>
                <Col xs="3" sm="3" md="3"></Col>
                <Col xs="6" sm="6" md="6">
                    <div className="row">
                        <div className="col-sm">
                            <div className={"text-center mt-1 mb-3"}>
                                <ButtonGroup>
                                    <Button
                                        className={currentUser === 1 ? "activeBtn" : ""}
                                        onClick={() => {
                                            setCurrentUser(1)
                                        }}
                                    >Constructor</Button>
                                    <Button
                                        className={currentUser === 2 ? "activeBtn" : ""}
                                        onClick={() => {
                                            setCurrentUser(2)
                                        }}
                                    >Movilizador</Button>
                                    <Button
                                        className={currentUser === 3 ? "activeBtn" : ""}
                                        onClick={() => {
                                            setCurrentUser(3)
                                        }}
                                    >Activista</Button>
                                </ButtonGroup>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className={"text-center mt-1 mb-3"}>
                                {persons.map((item) => {
                                    return (

                                        <ListGroup style={{ cursor: 'pointer' }} key={item.email} onClick={() => {
                                            onSelect(item)
                                        }}>
                                            <ListGroupItem>{item.name} <br/> {item.email}</ListGroupItem>
                                        </ListGroup>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </Col>
                <Col xs="3" sm="3" md="3"></Col>
            </Row>
        </Container>
    );
};

export default SelectPerson;


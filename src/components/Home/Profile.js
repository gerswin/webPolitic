import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from './Avatar'
import {Col, Container, Jumbotron, Row, Button, ButtonGroup, ListGroup} from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Row>
          <div class="profile">
            <Avatar
              title="Gerswin Pineda"

            />
          </div>
        </Row>
    );
  }
}


export default withAlert()(Profile)



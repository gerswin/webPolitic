import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from './Avatar'
import Body from './Body'
import Footer from './Footer'
import colors from "../../globals/colors";
//import {Col, Container, Jumbotron, Row, Button, ButtonGroup, ListGroup} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Avatar
          title="Gerswin Pineda"
        />
        <Body
          type="home"
        />
        <Footer/>
      </div>
    );
  }
}


export default withAlert()(Home)

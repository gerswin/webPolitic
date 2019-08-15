import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from './Avatar'
import Body from './Body'
import Footer from './Footer'
import colors from "../../globals/colors";
//import {Col, Container, Jumbotron, Row, Button, ButtonGroup, ListGroup} from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          text: 'Entrega la carta de Angela Garzón a tusVecinos',
        },
        {
          text: 'Realiza un volanteo',
        },
        {
          text: 'Realiza un casa por casa',
        },
      ]
    };
  }

  render() {
    return (
      <div>
        <Avatar
          title="Gerswin Pineda"
        />
        <Body
          type="challenges"
          title="Actividades semanales"
          list={this.state.list}
        />
        <Footer/>
      </div>
    );
  }
}


export default withAlert()(Profile)

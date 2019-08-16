import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from './Avatar'
import Body from './Body'
import Footer from './Footer'
import colors from "../../globals/colors";
import { getChallenges } from '../../firebaseData'
//import {Col, Container, Jumbotron, Row, Button, ButtonGroup, ListGroup} from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          text: '-Suma 5 Activistas a tu estructura',
        },
        {
          text: '-Nuevo Reto',
        },
        {
          text: '-Suma 10 movilizadores a tu estructura',
        },
      ]
    };
  }

  componentDidMount() {
    this.localGetChallenges()
  }

  async localGetChallenges() {
    const challenges = await getChallenges()
    console.log(challenges)
    this.setState({ list: challenges})
  }

  render() {
    return (
      <div>
        <Avatar/>
        <Body
          type="challenges"
          title="Retos de la semana"
          list={this.state.list}
        />
        <Footer/>
      </div>
    );
  }
}


export default withAlert()(Profile)

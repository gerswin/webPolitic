import React, {Component} from "react";
import {withAlert} from 'react-alert'
import colors from "../../globals/colors";
import {Col, Container, Jumbotron, Row} from 'reactstrap';
import Link from './Link'

class Body extends Component {
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

  renderHome() {

  }

  renderChallenges() {
    return this.state.list.map((item, index) => {
      return <Link
        text={item.text}
        key={index}
        isLast={index === this.state.list.length-1}
      />
    })
  }

  typeRender() {
    if (this.props.type === 'home') {
      return this.renderHome()
    } else if (this.props.type === 'challenges') {
      return this.renderChallenges()
    }
  }

  render() {
    return (
      <Row style={styles.margin}>
        <Col >
          <div>
            <h2 style={styles.title}>
              {this.props.title}
            </h2>
            <div ></div>
            { this.typeRender() }
          </div>
        </Col>
      </Row>
    );
  }
}

export default withAlert()(Body)

const styles = {
  title: {
    marginTop: '1em',
    color: colors.green,
    textAlign: 'center'
  }
}
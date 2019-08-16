import React, {Component} from "react";
import {withAlert} from 'react-alert'
import colors from "../../globals/colors";
import {Col, Row} from 'reactstrap';
import Link from './Link'
import imgRetos from "../../assets/retosIcon.png";
import imgActividades from "../../assets/actividadIcon.png";
import { Route } from 'react-router-dom'

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderItemHome(text, logo, url) {
    return <Route render={({ history}) => (
      <div
        style={styles.containerItem}
        onClick={() => history.push(`${url}`)}
      >
        <img
          src={logo}
          alt="#"
          style={{ width: 130, height: 130 }}
        />
        <p style={styles.itemText}>{text}</p>
      </div>
    )} />
  }

  renderHome() {
    return <div>
      {this.renderItemHome('Retos de la semana', imgRetos, '/profile')}
      {this.renderItemHome('Actividades semanales', imgActividades, '/activity')}
    </div>
  }

  renderChallenges() {
    return this.props.list.map((item, index) => {
      return <Route render={({ history}) => (
        <div onClick={() => history.push(`/challenge${item.id}`, { id: item.id })}>
          <Link
            text={item.name}
            key={index}
            isLast={index === this.props.list.length-1}
            item={item}
          />
        </div>
      )}/>
    })
  }

  typeRender() {
    if (this.props.type === 'home') {
      return this.renderHome()
    } else {
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
  },
  containerItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: colors.blue,
    fontSize: 19,
    fontWeight: 'bold'
  }
}

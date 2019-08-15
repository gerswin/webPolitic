import React, {Component} from "react";
import {withAlert} from 'react-alert'
import colors from "../../globals/colors";

class Link
 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getStyleContainer() {
    if (!this.props.isLast) {
      return {
        ...styles.linkContainer,
        borderBottom: '1px solid black'
      }
    } else {
      return styles.linkContainer
    }
  }

  render() {
    let stylelinkContainer = this.getStyleContainer()
    return (
      <div style={stylelinkContainer}>
        <h2 style={styles.text}>
          {this.props.text}
        </h2>
      </div>
    );
  }
}

export default withAlert()(Link)

const styles = {
  linkContainer: {
    display: 'flex',
    paddingTop: '.5em',
    paddingBottom: '1em',
    margin: '0 10%'
  },
  text: {
    
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 17
  }
}

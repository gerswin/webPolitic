import React, {Component} from "react";
import {withAlert} from 'react-alert'
import colors from "./globals/colors";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.footer}>
        #MedellínAdelante
      </div>
    );
  }
}

export default withAlert()(Footer)

const styles = {
  footer: {
    postion:'absolute',
    bottom:0,
    color: colors.green,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  }
}

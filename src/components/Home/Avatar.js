import React, {Component} from "react";
import {withAlert} from 'react-alert'
import colors from "../../globals/colors";

/*const colorGreen = {
  color: colors.green
}*/

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.flex}>
        Avatar
        <h4 style={styles.title}>{this.props.title}</h4> 
      </div>
    );
  }
}


export default withAlert()(Avatar)

const styles = {
  flex: {
    display: 'flex'
  },
  title: {
    fontSize: 20,
    color: colors.green
  }
}
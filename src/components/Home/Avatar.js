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
      <div class="row"> 
        <div style={styles.flex}>
          <div style={styles.containerImage}>
          </div>
          <h4 style={styles.title}>{this.props.title}</h4> 
        </div>
      </div>
    );
  }
}

export default withAlert()(Avatar)

const styles = {
  containerImage: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.blue,
    backgroundColor: 'red',
    width: 139,
    height: 139
  },
  flex: {
    display: 'flex'
  },
  title: {
    fontSize: 20,
    color: colors.green
  }
}
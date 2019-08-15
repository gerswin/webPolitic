import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from './Avatar'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="profile">
        <Avatar
          title="Gerswin Pineda"
          
        />
      </div>
    );
  }
}


export default withAlert()(Profile)



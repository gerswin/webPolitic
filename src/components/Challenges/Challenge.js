import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from '../Home/Avatar'
import Body from '../Home/Body'
import Footer from '../Home/Footer'
import colors from "../../globals/colors";
import { getChallengesById } from '../../firebaseData'

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {},

    };
  }
 
  componentDidMount() {
    //console.log()
    this.localGetChallengesById(this.props.match.params.id)
    //this.props.navigation.state.params.retoId
  }

  async localGetChallengesById(id) {
    const challenge = await getChallengesById(id)
    this.setState({ challenge }, () => { 
      console.log(this.state.challenge)
      //const x = new Date(this.state.challenge.dateEnd)
    })
  }

  render() {
    return (
      <div>
        <div style={styles.dateEnd}>{}</div>
        <Footer/>
      </div>
    );
  }
}

export default withAlert()(Challenge)


const styles = {
  dateEnd: {
    textAlign: 'right'
  }
}

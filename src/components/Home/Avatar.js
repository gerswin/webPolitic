import React, {Component} from "react";
import {withAlert} from 'react-alert'
import colors from "../../globals/colors";
import {Col, Row} from 'reactstrap';
import { db, fb } from '../../firebaseData'
import uuid from "uuid";
import {setUserImage} from "../../store/actions"
import {connect} from "react-redux";
import { Route } from 'react-router-dom'
class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    };
  }

  uploadAndUpdate = async uri => {

    const url = await this.uploadImageAsync(uri);
    const profile = db.collection("personas").doc(this.props.userEmail);
    this.props.dispatch(setUserImage(url))

    return profile
      .update({
        avatar: url
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  uploadImageAsync = async uri => {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        //reject(new TypeError('Network request failed'));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const ref = fb
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
  };

  handleClick() {
    this.input.click()
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    }, () => {
      this.uploadAndUpdate(this.state.file);
    })
  }

  render() {
    let roleName = "";
    switch (this.props.userRole) {
      case 1:
        roleName = "Constructor";
        break;
      case 2:
        roleName = "Movilizador";
        break;
      case 3:
        roleName = "Activista";
        break;
      default:
        roleName = "Admin";
    }
    return (
      <Row style={styles.margin}>
        <Col >
          <div
            style={styles.containerImage}
            onClick={() => this.handleClick()}
          >
            <div>
              <img
                src={this.props.userAvatar}
                alt="avatar"
                height="139"
                width="139"
                style={styles.image}
              />
              <input
                type="file"
                id="avatar"
                name="avatar"
                ref={(input) => { this.input = input }}
                accept="image/png, image/jpeg"
                style={styles.none}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
        </Col>
        <Col >
          <h4 style={styles.title}>{this.props.userName}</h4>
          <div style={styles.subtitle}>
            <p style={styles.p}>{roleName}</p>
            <p style={styles.p}>{this.props.userCount} Registros realizados</p>
            <Route render={({ history}) => (
                <button
                    className="btn btn-primary btn-block mg-b-10"
                    type="button"
                    onClick={()=>{
                      history.push(`/join`);

                    }}
                    style={{
                      marginTop:10,
                      backgroundColor: colors.green,
                      borderColor: colors.green,
                      fontSize:10
                    }}
                >
                  Registrar Voluntarios
                </button>
            )} />

          </div>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = state => ({
  userName: state.name,
  userCount: state.userCount,
  userEmail: state.email,
  userRole: state.role,
  userAvatar: state.image


});



const AvatarPre =connect(
    mapStateToProps,
    null
)(Avatar);
export default withAlert()(AvatarPre);

const styles = {
  none: {
    display: 'none'
  },
  image: {
    borderRadius: '50%',
    border: '5px solid ' + colors.blue,
    backgroundColor: 'gray',
    width: 139,
    height: 139
  },
  margin: {
    marginTop: 36
  },
  containerImage: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center'
  },
  flex: {
    display: 'flex'
  },
  title: {
    fontSize: 20,
    color: colors.green
  },
  subtitle: {

  },
  p: {
    color: colors.blue,
    fontWeight: 'bold',
    marginBottom: 0
  }
}

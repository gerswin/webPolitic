import React, {Component} from "react";
import {withAlert} from 'react-alert'
import Avatar from '../Home/Avatar'
import Body from '../Home/Body'
import Footer from '../Home/Footer'
import colors from "../../globals/colors";
import {getChallengesById} from '../../firebaseData'

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: {
                name: "",
                description: "",
                title: "",
                gifs: []
            },

        };
    }

    componentDidMount() {
        //console.log()
        console.log(this.props)

        this.localGetChallengesById(this.props.match.params.id)
        //this.props.navigation.state.params.retoId
    }

    async localGetChallengesById(id) {
        const challenge = await getChallengesById(id)
        this.setState({challenge}, () => {
            console.log(this.state.challenge)
            //const x = new Date(this.state.challenge.dateEnd)
        })
    }

    render() {
        const {name, description, gifs} = this.state.challenge;
        return (
            <div>
                <div style={styles.dateEnd}>{}</div>
                <div className="row">
                    <div className="col-md-3 col-sm-3"></div>
                    <div className="col-md-6 col-sm-6 text-center">
                        <h3 style={styles.title}>Retos de la semana</h3>
                    </div>
                    <div className="col-md-3 col-sm-3"></div>

                </div>

                <h4 style={styles.name}>{name}</h4>
                <p style={styles.description}>{description}</p>
                <div className="col-md-6 col-sm-6 text-center">
                    <h3 style={styles.title}>Incentivos</h3>
                </div>
                <div className="row" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:20
                }}>
                    {gifs.map(({image}, index) => {
                        return (<img
                            key={`reto-${index}`}
                            style={{width: 100, height: 100}}

                            src={image} alt=""/>)
                    })}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withAlert()(Challenge)


const styles = {
    dateEnd: {
        textAlign: 'right'
    },
    title: {
        marginTop: 10,
        color: colors.blue
    },
    name: {
        marginTop: 10,
        color: colors.green
    },
    description: {
        marginTop: 10,
        color: colors.blue
    }
}

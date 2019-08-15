import React, {Component} from "react";
import {withAlert} from "react-alert";
import WelcomeImage from "../assets/welcome.png"

import zones from "../m";

let result = [];
let index = 1;
for (const item of zones) {
    index = index + 1;
    result.push({
        id: index,
        name: item,
        value: item
    });
}

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 1,
            address: "",
            location: [
                {
                    value: ""
                }
            ]
        };
    }

    componentDidMount() {}

    render() {
        const { currentUser } = this.state;
        return (
           <div>
               <img src={WelcomeImage}  style={{objectFit:"fill",height:"85vh",  width:"100vw"}} alt=""/>
           </div>
        );
    }
}

export default withAlert()(Welcome);


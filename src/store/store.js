import {createStore} from "redux";
import reducer from "./reducers";
import {avatar} from "../firebaseData";


const initialState = {
    userCount: 0,
    avatar:avatar,
    image: avatar,
    userInfo:{
        address: "",
        avatar:avatar,
        cc: "",
        created:"",
        email: "",
        location: "",
        master: "",
        name: "",
        parent: "",
        phone: "",
        role: 3,
        zone: "",
        image: avatar,
        userRole: 3
    }
};


export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

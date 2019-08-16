import {createStore} from "redux";
import reducer from "./reducers";



const initialState = {
    userCount: 0,
    userInfo:{
        address: "",
        avatar:"",
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
        image: "",
        userRole: 3
    }
};


export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

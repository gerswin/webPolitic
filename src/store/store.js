import {createStore} from "redux";
import reducer from "./reducers";
import {avatar} from "../firebaseData";


const initialState = {
    userCount: 0,
    image: "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
    userInfo:{
        address: "",
        avatar:"https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
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
        image: "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
        userRole: 3
    }
};


export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

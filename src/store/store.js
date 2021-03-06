import {createStore} from "redux";
import reducer from "./reducers";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)



const initialState = {
    userCount: 0,
    userNetCount: 0,

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

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}



// export const store = createStore(
//     reducer,
//     initialState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

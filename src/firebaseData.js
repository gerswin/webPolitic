import * as firebase from 'firebase';

require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDR-QMDdzt4i6DXxwAp9jpMQVfv_6NWNVk",
    authDomain: "angelabogota-11a6c.firebaseapp.com",
    databaseURL: "https://angelabogota-11a6c.firebaseio.com",
    projectId: "angelabogota-11a6c",
    storageBucket: "angelabogota-11a6c.appspot.com",
    messagingSenderId: "59340269552",
    appId: "1:59340269552:web:a4c7f89efd75f508"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);


export const  db = firebaseApp.firestore();
export const  fb = firebaseApp;

import * as firebase from "firebase";
import {loginUser} from "./store/actions";
import * as Sentry from "@sentry/browser";
import {store} from "./store/store";

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

export const db = firebaseApp.firestore();
export const fb = firebaseApp;

export const signup = (email, password) => {
    return firebaseApp
        .auth()
        .createUserWithEmailAndPassword(
            email.toLowerCase().trim(),
            password.trim()
        );
};

export const signIn = (email, password) => {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
            return firebase.auth().signInWithEmailAndPassword(email.toLowerCase().trim(), password.trim());
        })
};

export const saveUserData = userData => {
    return db
        .collection("personas")
        .doc(userData.email)
        .set(userData);
};

export const signUpAlt = (email, password) => {
    return fetch(
        "https://us-central1-angelabogota-11a6c.cloudfunctions.net/widgets",
        {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user: email, password: password})
        }
    );
};
export const getAccountInfo = email => {
    return db
        .collection("personas")
        .doc(email)
        .get()
        .then(function (querySnapshot) {
            return querySnapshot.data();
        })
        .catch(function (error) {
            Sentry.captureException(error);
        });
};

export const countPeople = email => {
    return db
        .collection("personas")
        .where("parent", "==", email)
        .get()
        .then(function (querySnapshot) {
            console.log(querySnapshot.size)
            return querySnapshot.size;
        })
        .catch(function (error) {
            Sentry.captureException(error);
        });
};

export const getChallenges = () => {
    return db
        .collection("retos")
        .get()
        .then(querySnapshot => {
            let retos = [];
            querySnapshot.forEach(doc => {
                retos.push({id: doc.id, ...doc.data()});
            });
            return retos;
        });
};

export const getActivities = () => {
    return db
        .collection("actividades")
        .get()
        .then(querySnapshot => {
            let actividades = [];
            querySnapshot.forEach(doc => {
                actividades.push({id: doc.id, ...doc.data()});
            });
            return actividades;
        });
};

export const getResources = () => {
    return db
        .collection("recursos")
        .get()
        .then(querySnapshot => {
            let recursos = [];
            querySnapshot.forEach(doc => {
                recursos.push({id: doc.id, ...doc.data()});
            });
            return recursos;
        });
};

export const getChallengesById = id => {
    return db
        .collection("retos")
        .doc(id)
        .get()
        .then(function (querySnapshot) {
            return querySnapshot.data();
        });
};

export const getActivitiesById = id => {
    return db
        .collection("actividades")
        .doc(id)
        .get()
        .then(function (querySnapshot) {
            return querySnapshot.data();
        });
};

export const checkCC = cc => {
    return db
        .collection("personas")
        .where("cc", "==", cc)
        .get()
        .then(function (querySnapshot) {
            return querySnapshot.size;
        })
        .catch(function (error) {
            Sentry.captureException(error);
        });
};


export const avatar =
    "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg";


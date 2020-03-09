import * as firebase from "firebase";
import firebaseConfig from "src/conf/firebaseConfig";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

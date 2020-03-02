import * as firebase from "firebase";
import firebaseConfig from "src/conf/firebaseConfig";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();

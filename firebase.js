import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBpgq6Pj4vGbKqF_HxMQhw44yD-nLXOJro",
    authDomain: "aipim-climate-tracker.firebaseapp.com",
    databaseURL: "https://aipim-climate-tracker-default-rtdb.firebaseio.com",
    projectId: "aipim-climate-tracker",
    storageBucket: "aipim-climate-tracker.appspot.com",
    messagingSenderId: "856482482392",
    appId: "1:856482482392:web:02d21d2e76ffe1568dafad"
}

firebase.initializeApp(firebaseConfig);
const { Board, Led } = require("johnny-five");
const board = new Board();


//firebase connection
var firebase = require("firebase");

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



board.on("ready", () => {
    const catode = new Led.RGB({
        pins:{
            red: 6,
            green: 5, 
            blue: 3
        },
        isAnode: false
    });

    board.repl.inject({ catode });

    catode.on();

    //vermelho
    //catode.color("#FF0000");
    //amarelo
    //catode.color("#FF5500");
    //verde
    //catode.color("#008000");
    catode.blink(1000);
});
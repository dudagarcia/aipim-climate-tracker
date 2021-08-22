var five = require("johnny-five"), board, photoresistor;
board = new five.Board();


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



board.on("ready", function(){

    //create a new photoresistor hardware instance
    photoresistor = new five.Sensor({
        pin: "A2",
        freq: 250
    });

    //inject the sensor hardware into the repl instances context 
    //allows direct command line access
    board.repl.inject({
        pot: photoresistor
    });

    //"data" get the current reading from the photoresistor 
    photoresistor.on("data", function(){
        console.log(this.value);
    });
});
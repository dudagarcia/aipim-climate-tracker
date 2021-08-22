var five = require("johnny-five");
var board = new five.Board();


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
    console.log("ready!!");
    
    //create a led on pin 13
    var led = new five.Led(13);
    //strobe the pin on/off, defaults to 100ms phases
    led.blink(500);
});

firebase.database().ref('led').set('giovana');
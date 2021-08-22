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
    var multi = new five.Multi({
        controller: "DHT11_I2C_NANO_BACKPACK"
    });

    multi.on("change", function(){
        console.log("Thermometer");
        
        console.log("fahrenheit: ", this.thermometer.fahrenheit);
        console.log("celsius: ", this.thermometer.celsius);
        console.log("kelvin: ", this.thermometer.kelvin);

        console.log("Hygrometer");
        console.log("relative humidity:", this.hygrometer.relativeHumidity);
        console.log("-------------------");
    });
});
const { Board, Thermometer, Led, Proximity } = require("johnny-five");
var five = require("johnny-five");
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

board.on("ready", function(){
    //photoresistor
    photoresistor = new five.Sensor({
        pin: "A2",
        freq: 250
    });
    board.repl.inject({
        pot: photoresistor
    });
    photoresistor.on("data", function(){
        console.log(this.value);
        firebase.database().ref('photoresistor').set(this.value);
        if(this.value > 600){
            catode.color(blue);
            catode.blink(2000);
            firebase.database().ref('led').set(blue);
        }
    });

    //thermometer
    const thermometer = new Thermometer({
        controller: "LM35", 
        pin: "A0"
    });

    thermometer.on("change", () => {
        const {celsius, fahrenheit, kelvin} = thermometer;
        console.log("Thermometer");
        console.log("celsius: ", celsius);
        console.log("fahrenheit: ", fahrenheit);
        console.log("kelvin: ", kelvin);
        console.log("------------");
        firebase.database().ref('temperature').set(celsius);
        if(celsius > 25){
            catode.color(yellow);
            catode.blink(2000);
            firebase.database().ref('led').set(yellow);
        }
        if(celsius > 30){
            catode.color(red);
            catode.blink(2000);
            firebase.database().ref('led').set(red);
        }
    });

    //rgb
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

    var red = "#FF0000";
    var yellow = "#FF5500";
    var green = "#008000";
    var blue = "#6582C0";
    catode.color(green);
    catode.blink(2000);
    firebase.database().ref('led').set(green);

    //dht11
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
        firebase.database().ref('humidity').set(this.hygrometer.relativeHumidity);
    });

    //distance sensor
    const proximity = new Proximity({
        controller: "HCSR04", 
        pin: 7
    });

    proximity.on("change", () => {
        const {centimeters} = proximity;
        console.log("Proximity: ", centimeters);
        console.log("--------------");
        firebase.database().ref('distance').set(centimeters);
        if(centimeters < 500){
            catode.color(yellow);
            catode.blink(2000);
            firebase.database().ref('led').set(yellow);
        }
        if(centimeters < 200){
            catode.color(red);
            catode.blink(2000);
            firebase.database().ref('led').set(red);
        }
    });
    

});


//reading info from database
var snapshotOne = firebase.database().ref('plant_resistance').on('value', function(snapshot){
    let plant_resistance = snapshot.val();
});
var snapshotTwo = firebase.database().ref('climate_type').on('value', function(snapshot){
    let climate_type = snapshot.val();
});




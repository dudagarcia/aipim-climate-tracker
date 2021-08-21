var five = require("johnny-five"), board, photoresistor;
board = new five.Board();

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
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function(){
    console.log("ready!!");
    
    //create a led on pin 13
    var led = new five.Led(13);
    //strobe the pin on/off, defaults to 100ms phases
    led.blink(500);
});
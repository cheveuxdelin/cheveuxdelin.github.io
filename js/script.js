import "/js/clock.js"

if (!window.AudioContext) alert('you browser doesnt support Web Audio API');
let context = new AudioContext();
let clock = new WAAClock(context);

let beats = [];
let events = [];

let bpm = 60;

class beat {
    constructor(audioname, speed = 1, volume = 1) {
        this.audio = new Audio(audioname);
        this.audio.volume = volume;
        this.speed = speed;
    }
    play() {
        if (this.audio.paused == false) {
            let audio2 = this.audio.cloneNode();
            audio2.play();
        }
        else {
            this.audio.play();
        }
    }
    setVolume(volume){
        this.audio.volume = volume;
    }
}



let addBeat = function(audioname, speed, vol){
    beats.push(new beat(audioname, speed, vol));
}

document.getElementById("play").onclick = function () {
    if(beats.length == 0){
        alert("no beats loaded");
    }
    else{
        clock.stop();
        clock.start();
    
        events = [];
        for(let i = 0; i < beats.length; i++)
        {
            let speed = 60 / bpm * beats[i].speed;
            events.push(clock.callbackAtTime(function() { beats[i].play() }, 0.001).repeat(speed));
        }
    }
}

document.getElementById("add").onclick = function(){
    let speed = document.getElementById("speed").value;
    if(speed == ""){
        alert("no input found");
    }
    else{
        addBeat("drumstick.mp3", speed);
        console.log(beats.length);
    }
}

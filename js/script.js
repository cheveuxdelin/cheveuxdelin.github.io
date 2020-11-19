import "https://cheveuxdelin.github.io/metronomo/js/clock.js"

if (!window.AudioContext) alert('you browser doesnt support Web Audio API');


class beat {
    constructor(audioname, bpm) {
        this.audio = new Audio(audioname);
        this.speed = 60000 / bpm;
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

}

let audio1 = new beat("drumstick.mp3", 10);


document.getElementById("play").onclick = function () {
    let context = new AudioContext()
    let clock = new WAAClock(context)
    clock.start()

    audio1.audio.volume = 0;
    var event1 = clock.callbackAtTime(function () { audio1.play() }, 0.0001).repeat(0.5)
    var event2 = clock.callbackAtTime(function () { audio1.play() }, 0.0001).repeat(0.75)

}


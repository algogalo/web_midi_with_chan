// register WebMIDI. run in developer mode console
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

//create an array to hold our cc values and init to a normalized value
var cc=Array(128).fill(0.5)
//create an array to hold our channel specific cc values and init to a normalized value
var cc2 =Array(177).fill(null).map(()=>Array(128).fill(0.5))
console.log(cc)
console.log(cc2)  
getMIDIMessage = function(midiMessage) {
    var arr = midiMessage.data
    var chan = arr[0]  
    var index = arr[1]
    console.log('Midi received on channel# '+chan+' cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
    var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
    cc2[chan][index]=val  
console.log(cc2[chan][index])
}

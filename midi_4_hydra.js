// register WebMIDI. run in developer mode console
navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);
  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}

// create an array to hold our cc values and init to a normalized value
var cc = Array(128).fill(0.5)
var cc2 = Array(193).fill(null).map(() => Array(128).fill(0.5))
var cc3 = Array(193).fill(null).map(() => Array(128).fill(0.5))
getMIDIMessage = function(midiMessage) {
  var arr = midiMessage.data
  var comm = arr[0] >> 4
  var chan = arr[0] & 0xf
  var index = arr[1]
  console.log('Midi received on comm# ' + comm + ' channel# ' + chan + ' cc#' + index + ' value:' + arr[2]) // uncomment to monitor incoming Midi
  var val = (arr[2] + 1) / 128.0 // normalize CC values to 0.0 - 1.0
  cc[index] = val
  cc2[chan][index] = val
  cc3[chan] = index
 // console.log("cc: " + cc[index])
 // console.log("cc2: " + cc2[chan][index])
 // console.log("cc3: " + cc3[chan])
}

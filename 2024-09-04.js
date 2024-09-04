//create a stub with a compressor, reverb & an output
__().compressor().reverb().dac(0.7);

//declare & assign some variables:
//number of voices, between 6 & 24
var voices = __.random(6,24),
    //pointer to random function to save on typing
    r = __.random,
    //major scale
    maj = __.scales("major"),
	minor = __.scales("minor"),
	osc_types = ["sine", "square", "sawtooth", "triangle"],
    scales = ["major", "minor", "lydian", "mixolydian", "ionian", "overtone"];
	//chosen_scale = scales[r(0,5)];
	chosen_scale = "mixolydian";
	console.log(chosen_scale);
    scale = __.scales(chosen_scale);
	var timeouts = []

//loop and create voices to connect to stub above
for(var i=0;i<voices;i++) {
  //freq for this voice from the scale
  var freq = __.pitch2freq(scale[r(0,scale.length-1)] + (r(1,6)*12));
  //direction to pan, L or R
  var dir = r(0,100) > 50 ? 1 : -1;
  //position the sound in the stereo field
  dir = r(1,100)/100 * dir;
  //type of oscillator- other options: square, sawtooth
  var type = osc_types[r(0,3)];

  //lfo to modulate the frequency of the voice, then the voice itself (either sine or triangle), then gain, a panner and connect to the compressor defined above
  __().lfo({frequency:r(0,100)/1000,gain:r(1,200)/70}).osc({type:type,frequency:freq}).gain({gain:0,id:i+"_voice"}).panner({pan:dir,id:i+"_panner"}).connect("compressor");
  //add an additonal lfo to modulate the gain of the voice
  __().lfo({modulates:"gain",frequency:(r(1,100))/1000,gain:r(1,100)/40}).connect("#"+i+"_voice");
  //add one last lfo to modulate the voice's panner
  __().lfo({modulates:"pan",type:"sine",frequency:r(40,100)/100,gain:1}).connect("#"+i+"_panner");
  
}



// pulse - lowpass frequency will be the freq that this is audible
__().square(3/7).gain(9/5).lowpass({id:"lp1",frequency:60,q:40}).dac();
__().sine(7/14).gain(1/7).lowpass({id:"lp2",frequency:110,q:20}).dac();

// parallel delay
__("#lp1").delay({id:"delay1", delay:0.13,feedback:.7}).connect("dac");
__("#lp2").delay({id:"delay2", delay:0.60,feedback:0.3}).connect("dac");


// lfo to modulate delay time
__().lfo({id:"lfo1",modulates:"delay",gain:0.1,frequency:0.35}).connect("delay");

//second lfo to modulate the intensity of the first lfo
__().lfo({id:"lfo2",modulates:"gain",gain:1,frequency:0.5}).connect("#lfo1");


__.key_press(function(e){
  console.log(e);
  if (e.ctrlKey) {
  	switch(e.key){
  	  case "s":
        console.log("starting and resetting timeout....");
        console.log("waiting 5 seconds and then 0:00 - nadeshiko");
        timeouts.push(setTimeout(function(){
 	   	    __().play();
        },5000));
        break;
      case "q":
        console.log("stopping...")
        __("*").stop();
        for (var i=0; i<timeouts.length; i++) {
 		  clearTimeout(timeouts[i]);
        }
        break;
    }
  }
});

timeouts.push(setTimeout(function(){
  __("#delay1").attr({"delay":0.9, feedback: 0.2});
  __("#delay2").attr({"delay":0.279, feedback: 0.9});
  console.log("0:30... - start to snap ");
},30000));

timeouts.push(setTimeout(function(){
  __("#delay2").attr({"delay":3, feedback: 0.33});
  console.log("0:45... - our skin");
},45000));

timeouts.push(setTimeout(function(){
  __("delay").attr({"delay":0.999999, feedback: 1});
  console.log("1:15... - freezing to death ");
},75000));

timeouts.push(setTimeout(function(){
  __("delay").attr({"delay":0,feedback:0});
  __("square").stop();
  __("sine").stop();
  console.log("1:35... - you sing");
},95000));

timeouts.push(setTimeout(function(){
  __("delay").attr({"delay":0.3,feedback:0.6});
  __("square").play();
  __("sine").play();
  console.log("2:05... - my breast");
},125000));

timeouts.push(setTimeout(function(){
  __("delay").attr({"delay":0,feedback:0.0});
  __("square").stop();
  __("sine").stop();
  console.log("2:30... - rubus two");
},150000));

timeouts.push(setTimeout(function(){
  console.log("6:00... - rubus two ends");
},360000));

timeouts.push(setTimeout(function(){
  console.log("6:15... - erasures for virgo season. i.");
},375000));


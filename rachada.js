//initialize midi
__.midi_init(function(){

    __.midi_noteon(function(data){
        console.log(data);
    	__().play();
    });

    __.midi_noteoff(function(data){
        console.log(data);
      	__().stop();
    });

    __.midi_control(function(data){
        console.log(data);
      switch(data[1]){
        case 0:
         __("#lp1").attr({"q":data[2]*10});

        case 1:
          __("#lfo1").attr({"frequency":data[2]*.02});
          
        case 2:
          __("#lfo2").attr({"gain":data[2]*.1});
      }
      
    });

});

// pulse - lowpass frequency will be the freq that this is audible
__().square(3/7).gain(9/5).lowpass({id:"lp1",frequency:60,q:40}).dac();
__().sine(7/14).gain(1/7).lowpass({id:"lp2",frequency:110,q:20}).dac();

// parallel delay
__("#lp1").delay({delay:0.13,feedback:.7}).connect("dac");
__("#lp2").delay({delay:0.60,feedback:0.3}).connect("dac");


// lfo to modulate delay time
__().lfo({id:"lfo1",modulates:"delay",gain:0.1,frequency:0.35}).connect("delay");

//second lfo to modulate the intensity of the first lfo
__().lfo({id:"lfo2",modulates:"gain",gain:1,frequency:0.5}).connect("#lfo1");

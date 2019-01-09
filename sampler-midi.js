__.midi_init(function(){
	
    __.midi_noteon(function(data){
      	console.log(data);
      	__("sampler").speed(data[2]/63.5);
      	__("sampler").start(data[1]*0.10);
    	__().stop().play();
      	
    });

    __.midi_noteoff(function(data){
      __().stop();

    });

    __.midi_control(function(data){
      switch(data[1]){
        case 0:

        case 1:
          __("sampler").start(data[2]*Math.random()*3.6);
          __("sampler").end(data[2]*Math.random()*4.7);
          __("panner").pan(((data[2]-64)/127*Math.random()).toFixed(4));
          __().stop().play();
        case 2:
      }
      
    });

});

__().
  sampler({
    path:"samples/7_11_09-4_36PM.mp3",
    loop:"true"
  }).panner().dac();

//resonant bass pulse
__().square(0.1).lowpass({frequency:100,q:45}).gain(0.25).ring().compressor({release:0.01}).dac(0.1);

//hats sound
__().square(0.133333).highpass({frequency:1000,q:35}).gain(2).connect("ring");

//hats, offbeat
__().square(0.002).highpass({frequency:2000,q:35}).gain(6).connect("ring");

//hats, resonant fill
__().square(1/9).highpass({frequency:3000,q:50}).gain(8).connect("ring");

//chatter
__().square(1.3).highpass({frequency:1000,q:15}).gain(3).panner(1).connect("compressor");

//modulate the pan position
__().lfo({modulates:"pan",gain:1,frequency:1/4,type:"square"}).connect("panner");

//start
__.play();
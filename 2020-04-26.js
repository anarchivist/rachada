//resonant bass pulse
__().square(1/12).highpass({frequency:500,q:55}).gain(0.2).ring().compressor({release:0.01}).dac(0.5);

//hats sound
__().square(1/3).highpass({frequency:9000,q:5}).gain(2).connect("ring");

//hats, offbeat
__().square(1/27).highpass({frequency:2000,q:15}).gain(6).connect("ring");

//hats, resonant fill
__().square(1/9).highpass({frequency:3000,q:20}).gain(8).connect("ring");

//chatter
__().square(4/3).highpass({frequency:60,q:25}).gain(3).panner(1).connect("compressor");

//modulate the pan position
__().lfo({modulates:"pan",gain:1,frequency:1,type:"square"}).connect("panner");

//start
__.play();
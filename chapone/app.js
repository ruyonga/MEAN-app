require('./instantHello');

var goodbye = require('./talk/goodbye');
var talk = require('./talk');
var question =  require('./talk/question');

talk.intro();
talk.hello(" Daniel");


var answer = question.ask("Whats the meaning of life");
console.log(answer);

goodbye();
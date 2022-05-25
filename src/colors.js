const colors = require('colors/safe');


exports.success =  (Message) => {
    console.log(colors.green(Message));
}

exports.error =  (Message) => {
    console.log(colors.red(Message));
}

exports.warning =  (Message) => {
    console.log(colors.yellow(Message));
}

exports.info =  (Message) => {
    console.log(colors.blue(Message));
}

exports.debug =  (Message) => {
    console.log(colors.magenta(Message));
}

exports.log =  (Message) => {
    console.log(colors.white(Message));
}

exports.process = (Message) => {
    console.log(colors.cyan(Message));
}


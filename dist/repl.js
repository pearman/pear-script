#!/usr/bin/env node
"use strict";
var readline = require("readline");
var chalk = require("chalk");
var _ = require("lodash");
var fs = require("fs");
var interpreter_1 = require("./interpreter");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var interpreter = new interpreter_1.Interpreter();
function print(output) {
    if (_.has(output, 'value'))
        console.log(chalk.cyan('[OUT] = ' + JSON.stringify(output.value, null, 2)));
}
function read() {
    rl.question(chalk.green('pear-script> '), function (input) {
        if (input.trim() !== 'exit') {
            print(interpreter.interpret(input));
            read();
        }
        else {
            rl.close();
        }
    });
}
if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf8', function (err, file) {
        if (err)
            console.log(err);
        else
            interpreter.interpret(file);
        rl.close();
    });
}
else
    read();
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/repl.js.map
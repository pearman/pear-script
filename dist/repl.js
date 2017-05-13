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
var memory = [{}];
function print(output, time, printValue) {
    if (printValue === void 0) { printValue = true; }
    if (_.has(output, 'value') && printValue) {
        console.log(chalk.cyan("[OUT] = " + JSON.stringify(output.value, null, 2)));
    }
    console.log(chalk.grey("Executed in " + time + "ms"));
}
function read() {
    rl.question(chalk.green('pear-script> '), function (input) {
        if (input.trim() === '/exit') {
            rl.close();
            return;
        }
        else if (input.trim() === '/memory') {
            console.log(memory);
        }
        else {
            try {
                var output = interpreter.eval(input, memory);
                print(output, interpreter.lastExecutionTime);
            }
            catch (err) {
                if (_.has(err, 'message') && _.has(err, 'location')) {
                    console.log(chalk.red(err.message));
                    console.log(chalk.yellow("line " + err.location.start.line + ", character " + err.location.start.column));
                }
                else
                    console.error(chalk.red(err));
            }
        }
        read();
    });
}
var argv = require('minimist')(process.argv.slice(2));
if (_.has(argv, 'c')) {
    fs.readFile(argv.c, 'utf8', function (err, file) {
        if (err)
            console.log(err);
        else {
            try {
                interpreter.compile(file);
            }
            catch (err) {
                console.error(chalk.red(err));
            }
        }
        rl.close();
    });
}
else if (argv['_'].length > 0) {
    fs.readFile(argv['_'][0], 'utf8', function (err, file) {
        if (err)
            console.log(err);
        else {
            try {
                print(interpreter.eval(file), interpreter.lastExecutionTime, false);
            }
            catch (err) {
                console.error(chalk.red(err));
            }
        }
        rl.close();
    });
}
else
    read();
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/repl.js.map
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
var persistentTree = {};
function print(output, time, printValue) {
    if (printValue === void 0) { printValue = true; }
    if (_.has(output, 'value') && printValue) {
        console.log(chalk.cyan("[OUT] = " + JSON.stringify(output.value, null, 2)));
    }
    console.log(chalk.grey("Executed in " + time + "ms"));
}
function read() {
    rl.question(chalk.green('pear-script> '), function (input) {
        if (input.trim() !== 'exit') {
            try {
                var output = interpreter.eval(input, persistentTree);
                persistentTree = _.merge(persistentTree, _.omitBy(interpreter.parseTree, function (value, key) { return _.isInteger(_.parseInt(key)) || _.startsWith('_'); }));
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
            print(interpreter.eval(file), interpreter.lastExecutionTime, false);
        rl.close();
    });
}
else
    read();
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/repl.js.map
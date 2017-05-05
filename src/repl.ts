#!/usr/bin/env node

import * as readline from 'readline';
import * as chalk from 'chalk';
import * as _ from 'lodash';
import * as fs from 'fs';

import { Interpreter } from './interpreter';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let interpreter = new Interpreter();
let persistentTree = [{}];

function print(output, time, printValue = true) {
    if (_.has(output, 'value') && printValue) {
        console.log(chalk.cyan(`[OUT] = ${JSON.stringify(output.value, null, 2)}`));
    }
    console.log(chalk.grey(`Executed in ${time}ms`));
}

function read() {
    rl.question(chalk.green('pear-script> '),  input => {
        if (input.trim() !== 'exit') {
            try {
                let output = interpreter.eval(input, persistentTree);
                persistentTree = _.merge(
                    persistentTree, 
                    _.omitBy(interpreter.parseTree, (value, key) => _.isInteger(_.parseInt(key)) || _.startsWith('_'))
                );
                print(output, interpreter.lastExecutionTime);
            } catch(err) {
                if (_.has(err, 'message') && _.has(err, 'location')) {
                    console.log(chalk.red(err.message));
                    console.log(chalk.yellow(`line ${err.location.start.line}, character ${err.location.start.column}`));
                } else console.error(chalk.red(err));
            }
            read();
        } else {
            rl.close()
        }
    });
}

if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf8', (err, file) => {
        if (err) console.log(err);
        else print(interpreter.eval(file), interpreter.lastExecutionTime, false);
        rl.close();
    });
} else read();
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

function read() {
    rl.question(chalk.green('> '),  input => {
        if (input.trim() !== 'exit') {
            let output = interpreter.interpret(input);
            let value = _.get(output, [0, 'value']);
            let data = _.get(output, [0, 'data']);
            if (!_.isNil(value)) output = JSON.stringify(value);
            else if (!_.isNil(data)) output = interpreter.printTable(data);
            console.log(chalk.cyan('[OUT] = ' + output));
            read();
        } else {
            rl.close()
        }
    });
}

if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf8', (err, file) => {
        if (err) console.log(err);
        else {
            interpreter.interpret(file);
        }
        rl.close();
    });
} else read();
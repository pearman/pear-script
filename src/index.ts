import * as readline from 'readline';
import * as chalk from 'chalk';

import { interpret } from './interpreter';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function read() {
    rl.question(chalk.green('glang> '),  input => {
        if (input.trim() !== 'exit') {
            console.log(chalk.cyan('[OUT] = ' + JSON.stringify(interpret(input))));
            read();
        } else {
            rl.close()
        }
    });
}

read();
import * as readline from 'readline';
import * as chalk from 'chalk';
import * as _ from 'lodash';

import { interpret } from './interpreter';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function read() {
    rl.question(chalk.green('glang> '),  input => {
        if (input.trim() !== 'exit') {
            let output = interpret(input);
            let value = _.get(output, ['value'])
            output = (_.isNil(value)) ? output : value;
            console.log(chalk.cyan('[OUT] = ' + JSON.stringify(output)));
            read();
        } else {
            rl.close()
        }
    });
}

read();
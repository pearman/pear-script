import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as nearley from 'nearley';

import { Vm } from './vm';

let grammar = require('./grammar/grammar.js');

export class Interpreter {
    vm: Vm = new Vm();

    interpret(prog) {
        let parseTree = {};
        let output = null;
        try {
            parseTree = grammar.parse(prog);
            //console.log(parseTree);
            output = this.vm.execute(parseTree);
            //console.log(this.vm.memory);
        } catch (err) {
            console.log(chalk.red(err));
            output = null;
        }
        return output;
    }

    print(output) {
        if (_.has(output, 'value'))
            console.log(chalk.cyan('[OUT] = ' + JSON.stringify(output.value, null, 2)));
        else
          console.log(chalk.cyan('[OUT] = ' + JSON.stringify(output, null, 2)));  
    }
}
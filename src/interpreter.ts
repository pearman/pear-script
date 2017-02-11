import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as nearley from 'nearley';

import { Vm } from './vm';

let grammar = require('./grammar/grammar.js');
let vm = new Vm();

export function interpret(prog) {
    let parseTree = {};
    let output = null;
    try {
        parseTree = grammar.parse(prog);
        output = vm.execute(parseTree);
    } catch (err) {
        console.log(chalk.red(err));
        output = err;
    }
    console.log(chalk.yellow(JSON.stringify(parseTree, null, 2)));
    return output;
}
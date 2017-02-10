import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as nearley from 'nearley';

let grammar = require('./grammar/grammar.js');

export function interpret(prog) {
    let lastOutput = null;
    let parseTree = {};
    try {
        parseTree = grammar.parse(prog);
    } catch (err) {
        console.log(chalk.red('Parsing error!'));
        lastOutput = err;
    }
    console.log(JSON.stringify(parseTree, null, 2));
    //parseTree.forEach(vm.execute);
    return lastOutput;
}
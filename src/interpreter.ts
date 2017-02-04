import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as nearley from 'nearley';

let grammar = require('./grammar/grammar.js');

export function interpret(prog) {
    let parser =  new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    let lastOutput = null;
    let parseTree = {};
    try {
        parser.feed(prog);
        parseTree = parser.results;
    } catch (err) {
        console.log(chalk.red('Parsing error!'));
        lastOutput = err;
    }
    console.log(JSON.stringify(parseTree, null, 2));
    //parseTree.forEach(vm.execute);
    return lastOutput;
}
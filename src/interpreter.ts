import * as _ from 'lodash';

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
            throw err;
        }
        return output;
    }
}
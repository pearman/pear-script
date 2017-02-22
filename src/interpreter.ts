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
            output = this.vm.execute(parseTree);
        } catch (err) {
            console.log(chalk.red(err));
            output = err;
        }
        return output;
    }

    printTable(data) {
        let output = '';
        if (data) {
            output += '{ ';
            _.forEach(data, (value, key) => {
                let subValue = _.get(value, ['value']);
                if (_.isNil(subValue)) subValue = value;
                output += `${key}:${JSON.stringify(subValue)} `;
            });
            output += '}';
        }
        return output;
    }
}
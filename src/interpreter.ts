import * as _ from 'lodash';

import { Vm } from './vm';

let grammar = require('./grammar/grammar.js');

export class Interpreter {
    vm: Vm = new Vm();

    interpret(prog) {
        let parseTree = {};
        let output = null;
        try {
            parseTree = this.toTable(grammar.parse(prog));
            output = this.vm.eval(parseTree, parseTree);
        } catch (err) {
            throw err;
        }
        return output;
    }

    toTable(parseTree) {
        let i = 0;
        return _.reduce(parseTree, (acc, value: any) => {
            // Is Primitive
            if (!_.isObject(value) && !_.isArray(value))
                return _.assign(acc, { [i++]: value });
            // Is Comment
            if (_.has(value, '_comment'))
                return acc;
            // Is Chain, Method, or Property
            if (_.isArray(value) || _.has(value, '_method'))
                return _.assign(acc, { [i++]: value });
            // Is Assignment
            _.forEach(value, (value, key) => {
                _.set(acc, key, value);
            });
            return acc;
        }, {})
    }
}
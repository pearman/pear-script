import * as _ from 'lodash';

import { Table } from './types/table';
import { Number } from './types/number';
import { String } from './types/string';
import { Boolean } from './types/boolean';
let grammar = require('./grammar/grammar.js');

let progTemplate = (pIn, types, statements) => {
    let stringifyWithFunc = obj => 
        JSON.stringify(obj, (key, val) => (typeof val === 'function') ? '' + val : val);
    let compiledProg = statements.join(',\n');
    let t = stringifyWithFunc(types);
    let p = stringifyWithFunc(pIn);
    return `
let t = ${t};
let p = [{}];
let prog = [${compiledProg}]; 
prog.map(statement => statement(p, t);
`
}

export class Interpreter {
    lastExecutionTime = 0;
    types = {
        Number,
        String,
        Boolean,
        Table
    }

    eval(prog, memory = [{}]) {
        let result = null;
        let executionTime = null;
        try {
            let before = _.now();
            // Build a function for each statement
            let statements = grammar.parse(prog);
            // Execute each function sequentially
            let output = _.map(statements, (statement: any) => statement(memory, this.types));
            result = _.last(output);
            this.lastExecutionTime = _.now() - before;
        } catch (err) {
            throw err;
        }
        return result;
    }

    compile(prog, memory = [{}]) {
        try {
            // Build a function for each statement
            let statements = grammar.parse(prog);
            console.log(progTemplate(memory, this.types, statements));
        } catch (err) {
            throw err;
        }
    }
}
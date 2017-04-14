import * as _ from 'lodash';
import * as chalk from 'chalk';

import { Table } from './types/table';
import { Number } from './types/number';
import { String } from './types/string';
import { Boolean } from './types/boolean';

export class Vm {

    memory = {};

    execute(parseTree, acc = this.memory, level = 0) {
        let output = null;
        while (parseTree.length > 0) {
            let statement = parseTree.shift();
            //console.log(`${level} SHIFT`, statement);
            output = this.reduce(statement, acc, this.memory, level);
        }
        return output;
    }

    reduce(statement, acc, rootScope, level) {
        //console.log(`${level} REDUCE`, statement, acc);
        if (_.isArray(statement)) {
            return _.reduce(statement, (acc, value, i) => {
                return this.reduce(value, acc, rootScope, ++level);
            }, acc);
        } else {
            statement = this.wrapPrimitive(statement);
            switch(statement.type) {
                case 'assignment': 
                    var address = _.isArray(statement.parent) ?
                        _.map(statement.parent, 'value'):
                        statement.parent.value;
                    return _.set(acc, address, this.reduce(statement.child, acc, rootScope, ++level));
                case 'property':
                    return _.get(_.merge({}, rootScope, acc), statement.value);
                case 'method':
                    let method: any = _.get(acc, statement.method);
                    let args = _.map(statement.args, arg => this.reduce(arg, acc, rootScope, ++level));
                    if (_.isFunction(method)) {
                        args.unshift(acc);
                        return this.wrapPrimitive(method(args));
                    } else {
                        let mappedArgs = _.map(method.args, (arg: any, i) => ({[arg.value] : args[i]}))
                        let tableScope = _.assign({}, this.memory, ...mappedArgs);
                        return this.wrapPrimitive(this.reduce(method.block, tableScope, tableScope, ++level));
                    }
                default: return statement;
            }
        }
    }

    wrapPrimitive(statement) {
        if (_.isNumber(statement)) return _.merge({}, Table, Number, {value: statement, type: 'number'});
        if (_.isBoolean(statement)) return _.merge({}, Table, Boolean, {value: statement, type: 'boolean'});
        if (_.isString(statement)) return _.merge({}, Table, String, {value: statement, type: 'string'});
        return statement;
    }
}
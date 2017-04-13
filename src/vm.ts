import * as _ from 'lodash';
import * as chalk from 'chalk';

import { Table } from './types/table';
import { Number } from './types/number';
import { String } from './types/string';
import { Boolean } from './types/boolean';

export class Vm {

    memory = {};

    execute(parseTree, acc = this.memory) {
        let output = _.reduce(parseTree, (acc: any, statement: any) => {
            if (_.isArray(statement)) {
                return _.reduce(statement, (acc, value) => {
                    return this.execute([value], acc);
                }, acc);
            } else {
                statement = this.wrapPrimitive(statement);
                switch(statement.type) {
                    case 'assignment': 
                        var address = _.isArray(statement.parent) ?
                            _.map(statement.parent, 'value'):
                            statement.parent.value;
                        return _.set(acc, address, this.execute(_.isArray(statement.child) ? statement.child : [statement.child]));
                    case 'property':
                        return _.get(acc, statement.value);
                    case 'method':
                        let method: any = _.get(acc, statement.method);
                        let args = _.map(statement.args, arg => this.execute([arg]));
                        if (_.isFunction(method)) {
                            args.unshift(acc);
                            return this.wrapPrimitive(method(args));
                        } else {
                            let mappedArgs = _.map(method.args, (arg: any, i) => ({[arg.value] : args[i]}))
                            let scope = _.assign({}, this.memory, ...mappedArgs);
                            return this.wrapPrimitive(this.execute(method.block, scope));
                        }
                    default: return statement;
                }
            }
        }, acc);
        return output;
    }

    wrapPrimitive(statement) {
        if (_.isNumber(statement)) return _.merge({}, Table, Number, {value: statement, type: 'number'});
        if (_.isBoolean(statement)) return _.merge({}, Table, Boolean, {value: statement, type: 'boolean'});
        if (_.isString(statement)) return _.merge({}, Table, String, {value: statement, type: 'string'});
        return statement;
    }
}
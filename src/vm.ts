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
            //console.log(chalk.blue(`${level} SHIFT`), statement);
            output = this.reduce(statement, acc, _.cloneDeep(this.memory), level);
        }
        return output;
    }

    reduce(statement, acc, closure, level) {
        //console.log(chalk.green(`${level} REDUCE`), statement);
        if (_.isArray(statement)) {
            return _.reduce(statement, (accChain, value, i) => {
                let result = this.reduce(value, accChain, closure, ++level);
                //console.log(chalk.red('TYPE'), result);
                return result;
            }, acc);
        } else {
            statement = this.wrapPrimitive(statement);
            switch(statement.type) {
                case 'assignment': 
                    var address = _.isArray(statement.parent) ?
                        _.map(statement.parent, 'value'):
                        statement.parent.value;
                    return _.cloneDeep(
                        _.set(acc, address, this.reduce(statement.child, acc, closure, ++level))
                    );
                case 'property':
                    let result = _.get(_.merge({}, closure, acc), statement.value);
                    if (_.isNil(result)) throw `Error: Could not find key '${statement.value}'`;
                    return result;
                case 'method':
                    let method: any = _.get(acc, statement.method);
                    let args = _.map(statement.args, arg => this.reduce(arg, acc, closure, ++level));
                    if (_.isFunction(method)) {
                        args.unshift(acc);
                        return this.wrapPrimitive(method(args, acc, closure, level));
                    } else {
                        let mappedArgs = _.map(method.args, (arg: any, i) => ({[arg.value] : args[i]}))
                        let tableScope = _.assign({}, closure, acc, ...mappedArgs);
                        return this.wrapPrimitive(this.reduce(method.block, tableScope, tableScope, ++level));
                    }
                case 'comment' : break;
                default: return statement;
            }
        }
    }

    wrapPrimitive(statement) {
        if (_.isNumber(statement)) 
            return _.merge({}, Table(this), Number(this), {value: statement, type: 'number'});
        if (_.isBoolean(statement)) 
            return _.merge({}, Table(this), Boolean(this), {value: statement, type: 'boolean'});
        if (_.isString(statement)) 
            return _.merge({}, Table(this), String(this), {value: statement, type: 'string'});
        return statement;
    }

    runTable(table, acc, scope, level, args) {
        let key = _.uniqueId('__methodCall');
        acc[key] = table;
        let result = this.reduce({type: 'method', method: key, args}, acc, scope, ++level);
        _.unset(acc, key);
        return result;
    }
}
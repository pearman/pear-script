import * as _ from 'lodash';

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
            output = this.reduce(statement, acc, _.cloneDeep(this.memory), level);
        }
        return output;
    }

    reduce(statement, acc, closure, level) {
        if (_.isArray(statement)) {
            return _.reduce(statement, (accChain, value, i) => {
                let result = this.reduce(value, accChain, closure, ++level);
                return result;
            }, acc);
        } else {
            statement = this.wrapPrimitive(statement);
            switch(statement.type) {
                case 'assignment': return this.handleAssignment(statement, acc, closure, level);
                case 'property':return this.handleProperty(statement, acc, closure);
                case 'method': return this.handleMethod(statement, acc, closure, level);       
                case 'comment' : break;
                default: return statement;
            }
        }
    }

    handleAssignment(statement, acc, closure, level) {
        var address = _.isArray(statement.parent) ? _.map(statement.parent, 'value') : statement.parent.value;
        return _.cloneDeep(_.set(acc, address, this.reduce(statement.child, acc, closure, ++level)));
    }

    handleProperty(statement, acc, closure) {
        let result = _.get(_.merge({}, closure, acc), statement.value || statement);
        if (_.isNil(result)) throw `Error: Could not find key '${statement.value}'`;
        return result;
    }

    handleMethod(statement, acc, closure, level) {
        let method: any = this.handleProperty(statement.method, acc, closure);
        let args = _.map(statement.args, arg => this.reduce(arg, acc, closure, ++level));
        if (_.isFunction(method)) {
            args.unshift(acc);
            return this.wrapPrimitive(method(args, acc, closure, level));
        } else {
            if (_.isNil(method)) throw `Error: Could not find key '${statement.method}'`;
            let mappedArgs = _.map(method.args, (arg: any, i) => ({[arg.value] : args[i]}))
            let tableClosure = _.assign({}, closure, acc, ...mappedArgs);
            return this.wrapPrimitive(this.reduce(method.block, tableClosure, tableClosure, ++level));
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
import * as _ from 'lodash';

import { Table } from './types/table';
import { Number } from './types/number';
import { String } from './types/string';
import { Boolean } from './types/boolean';

export class Vm {
    eval(parseTree, parent = null, noTableExecution = false) {
        // Handle Primitives
        if (!_.isObject(parseTree)) 
            return this.wrapPrimitive(parseTree);

        // Handle Properties
        if (_.has(parseTree, '_property'))
            return this.eval(_.get(parent, parseTree._property), parent);

        // Handle Methods
        if (_.has(parseTree, '_method') && _.has(parseTree, '_args')) {
            let table: any = _.get(parent, parseTree._method);
            let args = _.map(parseTree._args, arg => this.eval(arg, parent, true));
            // Is it a JS function
            if (parent && _.isFunction(table)) {
                args.unshift(parent);
                return this.wrapPrimitive(table(args, parent));
            }
            // Otherwise it's a pear-script table
            let resolvedArgs = _.reduce(table._args, (acc, value:any, i) => {
                return _.merge(acc, {[value._property]: args[i]});
            }, {});
            return this.eval(_.merge(table, resolvedArgs), _.merge({}, parent, table));
        }

        // Handle Method Chains
        if (_.isArray(parseTree)) {
            return _.reduce(parseTree, (acc, element) => {
                if (!_.isObject(acc)) acc = this.wrapPrimitive(acc);
                return this.eval(element, _.merge({}, parent, acc));
            }, parent);
        }

        // Execute Table
        if (noTableExecution) return parseTree;

        let result = parseTree;
        let maxKey = -1;
        while (_.has(parseTree, ++maxKey))
            result = this.eval(parseTree[maxKey], parent);

        return result;
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
}
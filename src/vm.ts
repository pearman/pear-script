import * as _ from 'lodash';
import * as chalk from 'chalk';

import { Number } from './number';
import { String } from './string';
import { Table } from './table';
import { Boolean } from './boolean';

export class Vm {

    memory: Table = new Table();

    resolveAndWrap(block) {
        switch(block.type) {
            case 'number' : return new Number(block.value);
            case 'string' : return new String(block.value);
            case 'boolean' : return new Boolean(block.value);
        }
        return block;
    }

    executeStatement(statement, parent?) {
        if (_.isNil(parent)) parent = this.memory;
        switch (statement.type) {
            case 'method': return this.handleMethod(statement, parent);
            case 'property': return this.handleProperty(statement, parent);
            default: return this.resolveAndWrap(statement);
        }
    }

    executeTable(block) {
        if (_.isArray(block)) {
            return _.reduce(block, (acc: any, statement: any) => {
                return this.executeStatement(statement, acc);
            }, null);
        }
        return this.executeStatement(block);
    }
    
    execute(parseTree) {
        let outputVector = _.map(parseTree, (table: any) => this.executeTable(table));
        return outputVector;
    }

    handleMethod(statement, parent) {
        let methodName = parent.mappings[statement.method] || statement.method;
        if (parent.methods[methodName]) 
            return parent.methods[methodName](...this.execute(statement.args));
        else {
            console.log(chalk.red(`Cannot find method ${methodName}`));
            //console.log(chalk.yellow(JSON.stringify(parent, null, 2)));
            return null;
        }
    }

    handleProperty(statement, parent) {
        let get: any = parent.methods.get;
        let value = get(statement);
        return _.isNil(value) ? statement : value;
    }
}
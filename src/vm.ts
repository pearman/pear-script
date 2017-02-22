import * as _ from 'lodash';
import * as chalk from 'chalk';

import { Number } from './number';
import { String } from './string';
import { Table } from './table';
import { Boolean } from './boolean';

export class Vm {

    rootTable: Table = new Table();

    wrapType(block) {
        switch(block.type) {
            case 'number' : return new Number(block.value);
            case 'string' : return new String(block.value);
            case 'boolean' : return new Boolean(block.value);
            case 'table' : return new Table(block);
        }
        return block;
    }

    executeStatement(statement, parent?) {
        if (_.isNil(parent)) parent = this.rootTable;
        switch (statement.type) {
            case 'method': return this.handleMethod(statement, parent);
            case 'property': return this.handleProperty(statement, parent);
            default: return this.wrapType(statement);
        }
    }

    executeTable(block, parent = null) {
        if (_.isArray(block)) {
            return _.reduce(block, (acc: any, statement: any) => {
                return this.executeStatement(statement, acc);
            }, parent);
        }
        return this.executeStatement(block, parent);
    }
    
    execute(parseTree, parent = null) {
        let outputVector = _.map(parseTree, (table: any) => this.executeTable(table, parent));
        return outputVector;
    }

    handleMethod(statement, parent) {
        let localMethod = parent.data[statement.method];
        if (!_.isNil(localMethod)) {
            let executable = true;
            _.forEach(localMethod.args, (arg, index) => {
                let inArg = _.get(statement, ['args', index]);
                if (!_.isUndefined(inArg)) localMethod.data[arg.value] = this.executeStatement(inArg, parent);
                else executable = false;
            });
            if (executable) {
                let statements = _(localMethod.data)
                    .filter((statement, key: any) => _.startsWith(key, '#'))
                    .sortBy((value, key) => key)
                    .value();
                let output = _.get(this.execute(statements, localMethod), [0]);
                return output;
            } else console.log(chalk.red(`Not enough arguments for ${statement.method}`));;
        } else {
            let methodName = parent.mappings[statement.method] || statement.method;
            if (parent.methods[methodName])
                return parent.methods[methodName](...this.execute(statement.args, parent));
            else console.log(chalk.red(`Cannot find method ${statement.method}`));
        }
        return null;
    }

    handleProperty(statement, parent) {
        let get: any = parent.methods.get;
        let value = get(statement);
        if (_.isNil(value)) {
            get = this.rootTable.methods.get;
            value = get(statement);
        }
        if (_.isNil(value)) {
            console.log(chalk.red(`Unable to resolve ${statement.value}`));
            return undefined;
        }
        return value;
    }
}
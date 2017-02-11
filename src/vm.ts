import * as _ from 'lodash';
import * as chalk from 'chalk';

import { Number } from './number';

export class Vm {

    resolveAndWrap(block) {
        switch(block.type) {
            case 'number' : return new Number(block.value);
        }
        return block;
    }

    executeStatement(statement, parent?) {
        switch (statement.type) {
            case 'method': 
                if (parent) {
                    let methodName = _.get(parent, ['mappings', statement.method]) || statement.method;
                    let method = <(...any)=>any>_.get(parent, ['methods', methodName]);
                    if (method) return method(...statement.args);
                    else {
                        console.log(chalk.red(`Cannot find method ${methodName}`));
                        console.log(chalk.yellow(JSON.stringify(parent, null, 2)));
                        return null;
                    }
                }
            break;
            default: return this.resolveAndWrap(statement);
        }
        return statement;
    }

    executeTable(block) {
        if (_.isArray(block)) {
            return _.reduce(block, (acc: any, statement: any) => {
                return this.executeStatement(statement, acc);
            }, null);
        }
        return null;
    }
    
    execute(parseTree) {
        let lastOutput = null;
        _.forEach(parseTree, (table: any) => lastOutput = this.executeTable(table));
        return lastOutput;
    }
}
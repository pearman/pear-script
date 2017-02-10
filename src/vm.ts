import * as _ from 'lodash';

export class Vm {
    
    execute(parseTree) {
        _.forEach(parseTree, block => {
            switch(block.type) {
                case 'table': break;
                case 'chain': break;
                case 'method': 
                    // Check table for execution (if all args specified)
                break;
                default:
                    // Wrap literals with appriopriate object
                break;
            }
        });
    }
}
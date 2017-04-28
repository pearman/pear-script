import * as _ from 'lodash';
import { Interpreter } from '../interpreter';

export let Boolean: any = (interpreter: Interpreter) => ({
  'then': (args, parent) => {
    return args[0].value ? interpreter.evalParseTree(args[1], parent) : interpreter.evalParseTree(args[2], parent)
  }
})
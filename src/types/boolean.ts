import * as _ from 'lodash';
import { Interpreter } from '../interpreter';

export let Boolean: any = (interpreter: Interpreter) => ({
  'then': (args, parent) => {
    return args[0].value ? interpreter.eval(args[1], parent) : interpreter.eval(args[2], parent)
  }
})
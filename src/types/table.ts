import * as _ from 'lodash';
import { Interpreter } from '../interpreter';

export let Table = (interpreter: Interpreter) => ({
  'is': (args) => args[0].value === args[1].value,
  'isNot': (args) => args[0].value !== args[1].value,
  'print': (args) => {
    if(_.has(args[0], 'value')) console.log(args[0].value)
    else console.log(JSON.stringify(args[0], null, 2));
    return args[0];
  },
  'get': (args) => _.get(args[0], args[1].value)
});
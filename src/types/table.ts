import * as _ from 'lodash';
import { Vm } from '../vm';

export let Table = (vm: Vm) => ({
  'is': (args) => args[0].value === args[1].value,
  'print' : (args) => {
    if(_.has(args[0], 'value')) console.log(args[0].value)
    else console.log(JSON.stringify(args[0], null, 2));
    return args[0];
  },
});
import * as _ from 'lodash';
import { Interpreter } from '../interpreter';
import { Boolean } from './boolean';
import { String } from './string';
import { Number } from './number';

export let Table = (value?) => ({
  'is': (args) => Boolean(args[0].value === args[1].value),
  'isNot': (args) => Boolean(args[0].value !== args[1].value),
  'print': (args) => {
    if(_.has(args[0], 'value')) console.log(args[0].value)
    else console.log(JSON.stringify(args[0], null, 2));
    return String(args[0]);
  },
  'printTable': (args) => {
    console.log(args[0]);
    return args[0];
  },
  'printArray': (args) => {
    let i = 0;
    while (_.has(args[0], i)) {
      if(_.has(args[0][i], 'value')) console.log(args[0][i].value)
      else console.log(JSON.stringify(args[0][i], null, 2));
      i++;
    }
  },
  'get': (args) => _.get(args[0], args[1].value),
  'map': (args, parent) => {
    let i = 0;
    let result = _.cloneDeep(args[0]);
    while (_.has(args[0], i)) {
      let res = args[1]([args[0], args[0][i]]);
      result[i] = res;
      i++;
    }
    return result;
  },
  'sum': (args, p, t) => {
    let i = 0;
    let result = 0;
    while (_.has(args[0], i)) {
      let res =  args[0][i];
      if (_.isFunction(res)) res = res(p, t);
      result += res.value;
      i++;
    }
    return Number(result);
  },
  'length': (args, parent) => {
    let i = 0;
    while (_.has(args[0], i)) i++;
    return Number(i);
  },
});
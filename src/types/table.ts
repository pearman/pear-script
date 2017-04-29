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
  'get': (args) => _.get(args[0], args[1].value),
  'map': (args, parent) => {
    let i = 0;
    let result = {_args: []};
    while (_.has(args[0], i)) {
      let res = interpreter.evalParseTree(args[1], _.merge({}, parent, {[args[1]._args[0]._property]: args[0][i]}));
      result[i] = _.has(res, 'value') ? res.value : res;
      i++;
    }
    return result;
  },
  'sum': (args, parent) => {
    let i = 0;
    let result = 0;
    while (_.has(args[0], i)) {
      let res = interpreter.evalParseTree(args[0][i], _.merge({}, parent));
      result += res.value;
      i++;
    }
    return result;
  },
  'length': (args, parent) => {
    let i = 0;
    while (_.has(args[0], i)) i++;
    return i;
  }
});
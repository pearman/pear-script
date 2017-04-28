import * as _ from 'lodash';
import { Interpreter } from '../interpreter';
import { Table } from './table';

export let Number = (interpreter: Interpreter) => ({
  'times': (args, parent) => {
    let list = _.times(args[0].value, i => interpreter.evalParseTree(args[1], _.merge({}, parent, {[args[1]._args[0]._property]: i})));
    return _.reduce(list, (acc, value, i) => _.merge(acc, {[i]: _.has(value, 'value') ? value.value : value}), {_args: []});
  },
  '<' : (args) => args[0].value < args[1].value,
  '>' : (args) => args[0].value > args[1].value,
  '<=' : (args) => args[0].value <= args[1].value,
  '>=' : (args) => args[0].value >= args[1].value,
  '+' : (args) => args[0].value + args[1].value,
  '-' : (args) => args[0].value - args[1].value,
  '*' : (args) => args[0].value * args[1].value,
  '/' : (args) => args[0].value / args[1].value,
  '^' : (args) => Math.pow(args[0].value, args[1].value),
  'squared' : (args) => args[0].value * args[0].value,
  'sqrt': (args) => Math.sqrt(args[0].value),
  'log': (args) => Math.log(args[0].value),
  'log10': (args) => Math.log10(args[0].value),
  'log2': (args) => Math.log2(args[0].value),
  'exp': (args) => Math.exp(args[0].value)
});
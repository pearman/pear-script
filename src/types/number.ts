import * as _ from 'lodash';
import { Interpreter } from '../interpreter';
import { Table } from './table';
import { Boolean } from './boolean';

export let Number = (value) => _.assign(Table(), {
  // 'times': (args, parent) => {
  //   let list = _.times(args[0].value, i => interpreter.evalParseTree(args[1], _.merge({}, parent, {[args[1]._args[0]._property]: i})));
  //   return _.reduce(list, (acc, value, i) => _.merge(acc, {[i]: _.has(value, 'value') ? value.value : value}), {_args: []});
  // },
  '<' : (args) => Boolean(args[0].value < args[1].value),
  '>' : (args) => Boolean(args[0].value > args[1].value),
  '<=' : (args) => Boolean(args[0].value <= args[1].value),
  '>=' : (args) => Boolean(args[0].value >= args[1].value),
  '+' : (args) => Number(args[0].value + args[1].value),
  '-' : (args) => Number(args[0].value - args[1].value),
  '*' : (args) => Number(args[0].value * args[1].value),
  '/' : (args) => Number(args[0].value / args[1].value),
  '^' : (args) => Number(args[0].value ** args[1].value),
  'squared' : (args) => Number(args[0].value * args[0].value),
  'sqrt': (args) => Number(Math.sqrt(args[0].value)),
  'log': (args) => Number(Math.log(args[0].value)),
  'log10': (args) => Number(Math.log10(args[0].value)),
  'log2': (args) => Number(Math.log2(args[0].value)),
  'exp': (args) => Number(Math.exp(args[0].value)),
  value
});
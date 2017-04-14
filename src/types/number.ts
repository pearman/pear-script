import * as _ from 'lodash';

export let Number: any = {
  '+' : (args) => args[0].value + args[1].value,
  '-' : (args) => args[0].value - args[1].value,
  '*' : (args) => args[0].value * args[1].value,
  '/' : (args) => args[0].value / args[1].value,
  'pow' : (args) => Math.pow(args[0].value, args[1].value),
  'squared' : (args) => args[0].value * args[0].value,
  'sqrt': (args) => Math.sqrt(args[0].value),
  'log': (args) => Math.log(args[0].value),
  'log10': (args) => Math.log10(args[0].value),
  'log2': (args) => Math.log2(args[0].value),
  'exp': (args) => Math.exp(args[0].value)
}
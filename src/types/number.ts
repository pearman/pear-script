import * as _ from 'lodash';

export let Number: any = {
  '+' : (args) => _.sum(_.map(args, 'value')),
  '-' : (args) => _.sum(_.map(args, (num: any) => num.value * -1)),
  '*' : (args) => _.reduce(args, (acc, value: any) => acc * value.value, 1),
  '/' : (args) => _.reduce(args, (acc, value: any) => acc / value.value, 1),
  'squared' : (args) => {
    let a = args[0].value;
    return a * a;
  },
  'sqrt': (args) => Math.sqrt(args[0].value)
}
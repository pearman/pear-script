import * as _ from 'lodash';

export let Number: any = {
  'type': 'number',
  '+' : (args) => _.sum(_.map(args, 'value')),
  '-' : (args) => _.sum(_.map(args, (num: any) => num.value * -1)),
  '*' : (args) => _.reduce(args, (acc, value: any) => acc * value.value, 1),
  '/' : (args) => _.reduce(args, (acc, value: any) => acc / value.value, 1),
  'squared' : (args) => {
    let a = <number>_.map(args, 'value')[0];
    return a * a;
  }
}
import * as _ from 'lodash';

export let Table: any = {
  'is': (args) => args[0].value === args[1].value,
  'print' : (args) => {
    console.log(args[0].value);
    return args[0];
  },
}
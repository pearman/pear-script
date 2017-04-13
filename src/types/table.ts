import * as _ from 'lodash';

export let Table: any = {
  'type': 'table',
  'print' : (args) => {
    if (args.length === 1) {
      console.log(args[0].value);
      return args[0];
    } else {
      console.log(_.map(args, 'value'));
      return args;
    }
  },
}
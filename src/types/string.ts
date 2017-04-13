import * as _ from 'lodash';

export let String: any = {
  '+' : (args) => _.reduce(_.map(args, 'value'), (acc, value) => acc + value, ''),
}
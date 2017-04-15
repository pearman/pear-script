import * as _ from 'lodash';
import { Vm } from '../vm';

export let String = (vm: Vm) => ({
  '+' : (args) => _.reduce(_.map(args, 'value'), (acc, value) => acc + value, ''),
})
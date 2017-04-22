import * as _ from 'lodash';
import { Interpreter } from '../interpreter';

export let String = (interpreter: Interpreter) => ({
  '+' : (args) => _.reduce(_.map(args, 'value'), (acc, value) => acc + value, ''),
})
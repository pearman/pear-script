import * as _ from 'lodash';
import { Interpreter } from '../interpreter';
import { Table } from './table';

export let String = (value) => _.assign(Table(), {
  '+' : (args) => _.reduce(_.map(args, 'value'), (acc, value) => acc + value, ''),
  value
})
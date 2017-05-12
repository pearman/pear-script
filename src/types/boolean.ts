import * as _ from 'lodash';
import { Interpreter } from '../interpreter';
import { Table } from './table';

export let Boolean: any = (value) => _.assign(Table(), {
  'then': (args, p, t) => args[0].value ? args[1] : args[2],
  value
})
import * as _ from 'lodash';
import { Interpreter } from '../interpreter';
import { Table } from './table';

export let Boolean: any = (value) => _.assign(Table(), {
  // 'then': (args, parent) => {
  //   return args[0].value ? interpreter.evalParseTree(args[1], parent) : interpreter.evalParseTree(args[2], parent)
  // }
  value
})
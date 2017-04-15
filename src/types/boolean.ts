import * as _ from 'lodash';
import { Vm } from '../vm';

export let Boolean: any = (vm: Vm) => ({
  'then': (args) => args[0].value ? args[1] : args[2]
})
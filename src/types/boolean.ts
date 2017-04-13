import * as _ from 'lodash';

export let Boolean: any = {
  'then': (args) => args[0].value ? args[1] : args[2]
}
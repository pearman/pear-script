import * as _ from 'lodash';

import { Type } from './baseTypeInterface';
import { Table } from './table';
import { Boolean } from './boolean';

export class String implements Type {

    constructor(public value?: string) {
        let tableDefaults = new Table();
        this.mappings = _.merge({}, tableDefaults.mappings, this.mappings);
        this.methods = _.merge({}, tableDefaults.methods, this.methods);
    }

    data = {};

    mappings = {
        '+' : 'plus',
    }

    methods = {
        plus: (x: any): String => {
            return new String(this.value + x.value);
        },

        includes: (x: any): Boolean => {
            return new Boolean(_.includes(this.value, x.value));
        },

        is: (x: any): Boolean => {
            return new Boolean(_.isEqual(this.value, x.value));
        }
    }
}
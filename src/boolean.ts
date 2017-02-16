import * as _ from 'lodash';

import { Type } from './baseTypeInterface';
import { Table } from './table';

export class Boolean implements Type {

    constructor(public value?: boolean) {
        let tableDefaults = new Table();
        this.mappings = _.merge({}, tableDefaults.mappings, this.mappings);
        this.methods = _.merge({}, tableDefaults.methods, this.methods);
    }

    data = {};

    mappings = {
        '?' : 'ternary' 
    }

    methods = {
        ternary: (x: any, y: any): any => {
            return (this.value) ? x : y;
        },

        then: (x: any): (Boolean | any) => {
            return (this.value) ? x : new Boolean(false);
        },

        else: (x: any): (Boolean | any) => {
            return (this.value) ? new Boolean(true) : x;
        }
    }
}
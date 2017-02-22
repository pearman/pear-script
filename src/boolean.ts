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
        '?' : 'then' 
    }

    methods = {
        then: (x: any, y: any): any => {
            return (this.value) ? x : y;
        },

        and: (x: Boolean): any => {
            return new Boolean(this.value && x.value);
        },

        not: () => {
            return new Boolean(!this.value);
        },

        is: (x: Boolean) => {
            return new Boolean(this.value === x.value);
        } 
    }
}
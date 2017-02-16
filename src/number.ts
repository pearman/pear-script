import * as _ from 'lodash';

import { Type } from './baseTypeInterface';
import { Table } from './table';

export class Number implements Type {

    constructor(public value?: number) {
        let tableDefaults = new Table();
        this.mappings = _.merge({}, tableDefaults.mappings, this.mappings);
        this.methods = _.merge({}, tableDefaults.methods, this.methods);
    }

    data = {};

    mappings = {
        '+' : 'plus',
        '-' : 'minus',
        '/' : 'divide',
        '*' : 'times'
    }

    methods = {
        plus: (x: Number): Number => {
            return new Number(this.value + x.value);
        },

        minus: (x: Number): Number => {
            return new Number(this.value - x.value);
        },

        divide: (x: Number): Number => {
            return new Number(this.value / x.value);
        },

        times: (x: Number): Number => {
            return new Number(this.value * x.value);
        },

        squared: (): Number => {
            return new Number(this.value * this.value);
        },

        sqrt: (): Number => {
            return new Number(Math.sqrt(this.value));
        },

        abs: (): Number => {
            return new Number(Math.abs(this.value));
        }
    }
}
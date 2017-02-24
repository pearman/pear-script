import * as _ from 'lodash';

import { Type } from './baseTypeInterface';
import { Boolean } from './boolean';

export class Table implements Type {
    constructor(value?: any) {
        if (!_.isNil(value)) {
            _.forEach(value.block, (statement, index) => {
                this.data[`#${index}`] = statement;
            });
            this.args = value.args;
        }
    }

    value = undefined;

    args = [];

    data = {};

    mappings = {
        '#': 'getIndex',
        '=': 'set'
    };

    methods = {
        set: (property: any, value: any) => {
            this.data[property.value] = value;
            return this;
        },

        get: (property: any) => {
            return this.data[property.value];
        },

        getIndex: (property: any) => {
            return this.data[`#${property.value}`];
        },

        has: (property: any) => {
            return new Boolean(_.isUndefined(this.data[property.value]));
        },

        return: (value: any) => {
            this.value = value;
            return _.cloneDeep(this.value);
        },

        print: (value: any) => {
            let output = (_.isUndefined(value.value)) ? value : value.value;
            console.log(output);
            return output;
        },

        new: (value: any) => {
            return _.cloneDeep(value);
        }
    };
}
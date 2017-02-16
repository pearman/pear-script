import { Type } from './baseTypeInterface';

export class Table implements Type {
    data = {};

    mappings = {};

    methods = {
        set: (property: any, value: any) => {
            this.data[property.value] = value;
            return this;
        },

        get: (property: any) => {
            return this.data[property.value];
        }
    };
}
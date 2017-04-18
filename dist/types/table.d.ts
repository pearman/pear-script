import { Vm } from '../vm';
export declare let Table: (vm: Vm) => {
    'is': (args: any) => boolean;
    'isNot': (args: any) => boolean;
    'print': (args: any) => any;
};

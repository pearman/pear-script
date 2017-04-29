import { Interpreter } from '../interpreter';
export declare let Table: (interpreter: Interpreter) => {
    'is': (args: any) => boolean;
    'isNot': (args: any) => boolean;
    'print': (args: any) => any;
    'get': (args: any) => {};
    'map': (args: any, parent: any) => {
        _args: any[];
    };
    'sum': (args: any, parent: any) => number;
    'length': (args: any, parent: any) => number;
};

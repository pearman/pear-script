import { Interpreter } from '../interpreter';
export declare let Number: (interpreter: Interpreter) => {
    'times': (args: any, parent: any) => {
        _args: any[];
    } & {
        'is': (args: any) => boolean;
        'isNot': (args: any) => boolean;
        'print': (args: any) => any;
    } & {};
    '<': (args: any) => boolean;
    '>': (args: any) => boolean;
    '<=': (args: any) => boolean;
    '>=': (args: any) => boolean;
    '+': (args: any) => any;
    '-': (args: any) => number;
    '*': (args: any) => number;
    '/': (args: any) => number;
    '^': (args: any) => number;
    'squared': (args: any) => number;
    'sqrt': (args: any) => number;
    'log': (args: any) => number;
    'log10': (args: any) => number;
    'log2': (args: any) => number;
    'exp': (args: any) => number;
};

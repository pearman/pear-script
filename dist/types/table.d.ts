import { Interpreter } from '../interpreter';
export declare let Table: (interpreter: Interpreter) => {
    'is': (args: any) => boolean;
    'isNot': (args: any) => boolean;
    'print': (args: any) => any;
};

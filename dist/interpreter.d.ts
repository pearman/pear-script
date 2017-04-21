import { Vm } from './vm';
export declare class Interpreter {
    vm: Vm;
    interpret(prog: any): any;
    toTable(parseTree: any): {};
}

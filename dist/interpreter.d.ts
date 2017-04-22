export declare class Interpreter {
    lastExecutionTime: any;
    interpret(prog: any): any;
    eval(parseTree: any, parent?: any, noTableExecution?: boolean): any;
    wrapPrimitive(statement: any): any;
    toTable(parseTree: any): {};
}

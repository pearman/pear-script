export declare class Interpreter {
    parseTree: {};
    lastExecutionTime: number;
    interpret(prog: any, persistentTree?: {}): any;
    eval(parseTreeIn: any, parent?: any, noTableExecution?: boolean): any;
    wrapPrimitive(statement: any): any;
    toTable(parseTree: any): {};
}

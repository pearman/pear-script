export declare class Interpreter {
    parseTree: {};
    lastExecutionTime: number;
    eval(prog: any, persistentTree?: {}): any;
    evalParseTree(parseTreeIn: any, parent?: any, noTableExecution?: boolean): any;
    wrapPrimitive(statement: any): any;
    toTable(parseTree: any): {};
    attemptToResolveKeys(parseTree: any, parent: any): any;
}

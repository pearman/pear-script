export declare class Interpreter {
    lastExecutionTime: number;
    parseTree: {};
    types: {
        Number: (value: any) => {};
        String: (value: any) => {};
        Boolean: any;
        Table: (value?: any) => {
            'is': (args: any) => any;
            'isNot': (args: any) => any;
            'print': (args: any) => {};
            'get': (args: any) => {};
            'length': (args: any, parent: any) => {};
        };
    };
    eval(prog: any, persistentTree?: {}[]): any;
    precompute(prog: any, persistentTree?: {}): any;
    evalParseTree(parseTreeIn: any, parent?: any, noTableExecution?: boolean): any;
    wrapPrimitive(statement: any): any;
    toTable(parseTree: any): {};
    attemptToResolveKeys(parseTree: any, parent: any): any;
}

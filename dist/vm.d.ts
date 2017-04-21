export declare class Vm {
    memory: {};
    eval(parseTree: any, parent?: any, noTableExecution?: boolean): any;
    wrapPrimitive(statement: any): any;
}

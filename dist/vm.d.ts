export declare class Vm {
    memory: {};
    execute(parseTree: any, acc?: {}, level?: number): any;
    reduce(statement: any, acc: any, closure: any, level: any): any;
    wrapPrimitive(statement: any): any;
    runTable(table: any, acc: any, scope: any, level: any, args: any): any;
}

export declare class Interpreter {
    lastExecutionTime: number;
    types: {
        Number: (value: any) => {};
        String: (value: any) => {};
        Boolean: any;
        Table: (value?: any) => {
            'is': (args: any) => any;
            'isNot': (args: any) => any;
            'print': (args: any) => {};
            'printTable': (args: any) => any;
            'printArray': (args: any) => void;
            'get': (args: any) => {};
            'map': (args: any, parent: any) => any;
            'sum': (args: any, p: any, t: any) => {};
            'length': (args: any, parent: any) => {};
        };
    };
    eval(prog: any, memory?: {}[]): any;
    compile(prog: any, memory?: {}[]): void;
}

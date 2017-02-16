export interface Type {
    data: {[key: string]: any};
    mappings: {[key: string]: string};
    methods: {[key: string]: (...values)=>any};
}
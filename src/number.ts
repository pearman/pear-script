
export class Number {

    constructor(public value?: number) {}

    mappings = {
        '+' : 'plus',
        '-' : 'minus',
        '/' : 'divide',
        '*' : 'times'
    }

    methods = {
        plus: (x: Number): Number => {
            return new Number(this.value + x.value);
        },

        minus: (x: Number): Number => {
            return new Number(this.value - x.value);
        },

        divide: (x: Number): Number => {
            return new Number(this.value / x.value);
        },

        times: (x: Number): Number => {
            return new Number(this.value * x.value);
        },

        squared: (): Number => {
            return new Number(this.value * this.value);
        },

        sqrt: (): Number => {
            return new Number(Math.sqrt(this.value));
        },

        abs: (): Number => {
            return new Number(Math.abs(this.value));
        }
    }
}
"use strict";
var _ = require("lodash");
var boolean_1 = require("./boolean");
var string_1 = require("./string");
var number_1 = require("./number");
exports.Table = function (value) { return ({
    'is': function (args) { return boolean_1.Boolean(args[0].value === args[1].value); },
    'isNot': function (args) { return boolean_1.Boolean(args[0].value !== args[1].value); },
    'print': function (args) {
        if (_.has(args[0], 'value'))
            console.log(args[0].value);
        else
            console.log(JSON.stringify(args[0], null, 2));
        return string_1.String(args[0]);
    },
    'printTable': function (args) {
        console.log(args[0]);
        return args[0];
    },
    'printArray': function (args) {
        var i = 0;
        while (_.has(args[0], i)) {
            if (_.has(args[0][i], 'value'))
                console.log(args[0][i].value);
            else
                console.log(JSON.stringify(args[0][i], null, 2));
            i++;
        }
    },
    'get': function (args) { return _.get(args[0], args[1].value); },
    'map': function (args, parent) {
        var i = 0;
        var result = _.cloneDeep(args[0]);
        while (_.has(args[0], i)) {
            var res = args[1]([args[0], args[0][i]]);
            result[i] = res;
            i++;
        }
        return result;
    },
    'sum': function (args, p, t) {
        var i = 0;
        var result = 0;
        while (_.has(args[0], i)) {
            var res = args[0][i];
            if (_.isFunction(res))
                res = res(p, t);
            result += res.value;
            i++;
        }
        return number_1.Number(result);
    },
    'length': function (args, parent) {
        var i = 0;
        while (_.has(args[0], i))
            i++;
        return number_1.Number(i);
    },
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/table.js.map
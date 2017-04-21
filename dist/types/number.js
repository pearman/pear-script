"use strict";
var _ = require("lodash");
var table_1 = require("./table");
exports.Number = function (vm) { return ({
    'times': function (args, parent) {
        var list = _.times(args[0].value, function (i) {
            return vm.eval(args[1], _.merge({}, parent, (_a = {}, _a[args[1]._args[0]._property] = i, _a)));
            var _a;
        });
        var map = _.reduce(list, function (acc, value, i) {
            return _.assign(acc, (_a = {}, _a[i] = value, _a));
            var _a;
        }, {});
        return _.merge({ _args: [] }, table_1.Table(vm), map);
    },
    '<': function (args) { return args[0].value < args[1].value; },
    '>': function (args) { return args[0].value > args[1].value; },
    '<=': function (args) { return args[0].value <= args[1].value; },
    '>=': function (args) { return args[0].value >= args[1].value; },
    '+': function (args) { return args[0].value + args[1].value; },
    '-': function (args) { return args[0].value - args[1].value; },
    '*': function (args) { return args[0].value * args[1].value; },
    '/': function (args) { return args[0].value / args[1].value; },
    '^': function (args) { return Math.pow(args[0].value, args[1].value); },
    'squared': function (args) { return args[0].value * args[0].value; },
    'sqrt': function (args) { return Math.sqrt(args[0].value); },
    'log': function (args) { return Math.log(args[0].value); },
    'log10': function (args) { return Math.log10(args[0].value); },
    'log2': function (args) { return Math.log2(args[0].value); },
    'exp': function (args) { return Math.exp(args[0].value); }
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/number.js.map
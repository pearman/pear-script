"use strict";
var _ = require("lodash");
var table_1 = require("./table");
exports.Number = function (vm) { return ({
    'times': function (args, acc, closure, level) {
        var list = _.times(args[0].value, function (i) { return vm.runTable(args[1], acc, closure, level, [i]); });
        var map = _.reduce(list, function (acc, value, i) {
            return _.assign(acc, (_a = {}, _a[i] = value, _a));
            var _a;
        }, {});
        return _.merge({ type: 'table', args: [], block: [] }, table_1.Table(vm), map);
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
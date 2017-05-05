"use strict";
var _ = require("lodash");
var table_1 = require("./table");
var boolean_1 = require("./boolean");
exports.Number = function (value) { return _.assign(table_1.Table(), {
    // 'times': (args, parent) => {
    //   let list = _.times(args[0].value, i => interpreter.evalParseTree(args[1], _.merge({}, parent, {[args[1]._args[0]._property]: i})));
    //   return _.reduce(list, (acc, value, i) => _.merge(acc, {[i]: _.has(value, 'value') ? value.value : value}), {_args: []});
    // },
    '<': function (args) { return boolean_1.Boolean(args[0].value < args[1].value); },
    '>': function (args) { return boolean_1.Boolean(args[0].value > args[1].value); },
    '<=': function (args) { return boolean_1.Boolean(args[0].value <= args[1].value); },
    '>=': function (args) { return boolean_1.Boolean(args[0].value >= args[1].value); },
    '+': function (args) { return exports.Number(args[0].value + args[1].value); },
    '-': function (args) { return exports.Number(args[0].value - args[1].value); },
    '*': function (args) { return exports.Number(args[0].value * args[1].value); },
    '/': function (args) { return exports.Number(args[0].value / args[1].value); },
    '^': function (args) { return exports.Number(Math.pow(args[0].value, args[1].value)); },
    'squared': function (args) { return exports.Number(args[0].value * args[0].value); },
    'sqrt': function (args) { return exports.Number(Math.sqrt(args[0].value)); },
    'log': function (args) { return exports.Number(Math.log(args[0].value)); },
    'log10': function (args) { return exports.Number(Math.log10(args[0].value)); },
    'log2': function (args) { return exports.Number(Math.log2(args[0].value)); },
    'exp': function (args) { return exports.Number(Math.exp(args[0].value)); },
    value: value
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/number.js.map
"use strict";
var _ = require("lodash");
var table_1 = require("./table");
exports.Boolean = function (value) { return _.assign(table_1.Table(), {
    // 'then': (args, parent) => {
    //   return args[0].value ? interpreter.evalParseTree(args[1], parent) : interpreter.evalParseTree(args[2], parent)
    // }
    value: value
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/boolean.js.map
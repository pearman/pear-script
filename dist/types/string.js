"use strict";
var _ = require("lodash");
var table_1 = require("./table");
exports.String = function (value) { return _.assign(table_1.Table(), {
    '+': function (args) { return _.reduce(_.map(args, 'value'), function (acc, value) { return acc + value; }, ''); },
    value: value
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/string.js.map
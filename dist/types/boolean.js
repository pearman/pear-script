"use strict";
var _ = require("lodash");
var table_1 = require("./table");
exports.Boolean = function (value) { return _.assign(table_1.Table(), {
    'then': function (args, p, t) { return args[0].value ? args[1] : args[2]; },
    value: value
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/boolean.js.map
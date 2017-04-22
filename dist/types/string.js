"use strict";
var _ = require("lodash");
exports.String = function (interpreter) { return ({
    '+': function (args) { return _.reduce(_.map(args, 'value'), function (acc, value) { return acc + value; }, ''); },
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/string.js.map
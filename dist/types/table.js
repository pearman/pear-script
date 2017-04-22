"use strict";
var _ = require("lodash");
exports.Table = function (interpreter) { return ({
    'is': function (args) { return args[0].value === args[1].value; },
    'isNot': function (args) { return args[0].value !== args[1].value; },
    'print': function (args) {
        if (_.has(args[0], 'value'))
            console.log(args[0].value);
        else
            console.log(JSON.stringify(args[0], null, 2));
        return args[0];
    },
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/table.js.map
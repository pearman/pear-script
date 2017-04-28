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
    'get': function (args) { return _.get(args[0], args[1].value); },
    'map': function (args, parent) {
        var i = 0;
        var result = { _args: [] };
        while (_.has(args[0], i)) {
            var res = interpreter.evalParseTree(args[1], _.merge({}, parent, (_a = {}, _a[args[1]._args[0]._property] = args[0][i], _a)));
            result[i] = _.has(res, 'value') ? res.value : res;
            i++;
        }
        return result;
        var _a;
    }
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/table.js.map
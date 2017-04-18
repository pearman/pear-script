"use strict";
exports.Boolean = function (vm) { return ({
    'then': function (args) { return args[0].value ? args[1] : args[2]; }
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/boolean.js.map
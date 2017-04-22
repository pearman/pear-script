"use strict";
exports.Boolean = function (interpreter) { return ({
    'then': function (args, parent) {
        return args[0].value ? interpreter.eval(args[1], parent) : interpreter.eval(args[2], parent);
    }
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/boolean.js.map
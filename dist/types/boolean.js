"use strict";
exports.Boolean = function (interpreter) { return ({
    'then': function (args, parent) {
        return args[0].value ? interpreter.evalParseTree(args[1], parent) : interpreter.evalParseTree(args[2], parent);
    }
}); };
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/types/boolean.js.map
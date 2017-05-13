"use strict";
var _ = require("lodash");
var table_1 = require("./types/table");
var number_1 = require("./types/number");
var string_1 = require("./types/string");
var boolean_1 = require("./types/boolean");
var grammar = require('./grammar/grammar.js');
var progTemplate = function (pIn, types, statements) {
    var stringifyWithFunc = function (obj) {
        return JSON.stringify(obj, function (key, val) { return (typeof val === 'function') ? '' + val : val; });
    };
    var compiledProg = statements.join(',\n');
    var t = stringifyWithFunc(types);
    var p = stringifyWithFunc(pIn);
    return "\nlet t = " + t + ";\nlet p = [{}];\nlet prog = [" + compiledProg + "]; \nprog.map(statement => statement(p, t);\n";
};
var Interpreter = (function () {
    function Interpreter() {
        this.lastExecutionTime = 0;
        this.types = {
            Number: number_1.Number,
            String: string_1.String,
            Boolean: boolean_1.Boolean,
            Table: table_1.Table
        };
    }
    Interpreter.prototype.eval = function (prog, memory) {
        var _this = this;
        if (memory === void 0) { memory = [{}]; }
        var result = null;
        var executionTime = null;
        try {
            var before = _.now();
            // Build a function for each statement
            var statements = grammar.parse(prog);
            // Execute each function sequentially
            var output = _.map(statements, function (statement) { return statement(memory, _this.types); });
            result = _.last(output);
            this.lastExecutionTime = _.now() - before;
        }
        catch (err) {
            throw err;
        }
        return result;
    };
    Interpreter.prototype.compile = function (prog, memory) {
        if (memory === void 0) { memory = [{}]; }
        try {
            // Build a function for each statement
            var statements = grammar.parse(prog);
            console.log(progTemplate(memory, this.types, statements));
        }
        catch (err) {
            throw err;
        }
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/interpreter.js.map
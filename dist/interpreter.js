"use strict";
var _ = require("lodash");
var vm_1 = require("./vm");
var grammar = require('./grammar/grammar.js');
var Interpreter = (function () {
    function Interpreter() {
        this.vm = new vm_1.Vm();
    }
    Interpreter.prototype.interpret = function (prog) {
        var parseTree = {};
        var output = null;
        try {
            parseTree = this.toTable(grammar.parse(prog));
            output = this.vm.eval(parseTree, parseTree);
        }
        catch (err) {
            throw err;
        }
        return output;
    };
    Interpreter.prototype.toTable = function (parseTree) {
        var i = 0;
        return _.reduce(parseTree, function (acc, value) {
            // Is Primitive
            if (!_.isObject(value) && !_.isArray(value))
                return _.assign(acc, (_a = {}, _a[i++] = value, _a));
            // Is Comment
            if (_.has(value, '_comment'))
                return acc;
            // Is Chain, Method, or Property
            if (_.isArray(value) || _.has(value, '_method'))
                return _.assign(acc, (_b = {}, _b[i++] = value, _b));
            // Is Assignment
            _.forEach(value, function (value, key) {
                _.set(acc, key, value);
            });
            return acc;
            var _a, _b;
        }, {});
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/interpreter.js.map
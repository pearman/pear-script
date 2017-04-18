"use strict";
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
            parseTree = grammar.parse(prog);
            //console.log(parseTree);
            output = this.vm.execute(parseTree);
        }
        catch (err) {
            console.error(err);
            output = null;
        }
        return output;
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/interpreter.js.map
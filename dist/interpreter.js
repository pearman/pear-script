"use strict";
var _ = require("lodash");
var table_1 = require("./types/table");
var number_1 = require("./types/number");
var string_1 = require("./types/string");
var boolean_1 = require("./types/boolean");
var grammar = require('./grammar/grammar.js');
var Interpreter = (function () {
    function Interpreter() {
        this.parseTree = {};
        this.lastExecutionTime = -1;
    }
    Interpreter.prototype.interpret = function (prog, persistentTree) {
        if (persistentTree === void 0) { persistentTree = {}; }
        var parseTree = {};
        var output = null;
        var executionTime = null;
        try {
            this.parseTree = this.toTable(grammar.parse(prog));
            var before = _.now();
            output = this.eval(this.parseTree, _.merge({}, persistentTree, this.parseTree));
            this.lastExecutionTime = _.now() - before;
        }
        catch (err) {
            throw err;
        }
        return output;
    };
    Interpreter.prototype.eval = function (parseTree, parent, noTableExecution) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        if (noTableExecution === void 0) { noTableExecution = false; }
        // Handle Primitives
        if (!_.isObject(parseTree))
            return this.wrapPrimitive(parseTree);
        // Handle Properties
        if (_.has(parseTree, '_property'))
            return this.eval(_.get(parent, parseTree._property), parent);
        // Handle Methods
        if (_.has(parseTree, '_method') && _.has(parseTree, '_args')) {
            var table = _.get(parent, parseTree._method);
            var args_1 = _.map(parseTree._args, function (arg) { return _this.eval(arg, parent, true); });
            // Is it a JS function
            if (parent && _.isFunction(table)) {
                args_1.unshift(parent);
                return this.wrapPrimitive(table(args_1, parent));
            }
            // Otherwise it's a pear-script table
            var resolvedArgs = _.reduce(table._args, function (acc, value, i) {
                return _.merge(acc, (_a = {}, _a[value._property] = args_1[i], _a));
                var _a;
            }, {});
            return this.eval(_.merge(table, resolvedArgs), _.merge({}, parent, table));
        }
        // Handle Method Chains
        if (_.isArray(parseTree)) {
            return _.reduce(parseTree, function (acc, element) {
                if (!_.isObject(acc))
                    acc = _this.wrapPrimitive(acc);
                return _this.eval(element, _.merge({}, parent, acc));
            }, parent);
        }
        // Execute Table
        if (noTableExecution)
            return parseTree;
        var result = parseTree;
        var maxKey = -1;
        while (_.has(parseTree, ++maxKey))
            result = this.eval(parseTree[maxKey], parent);
        return result;
    };
    Interpreter.prototype.wrapPrimitive = function (statement) {
        if (_.isNumber(statement))
            return _.merge({}, table_1.Table(this), number_1.Number(this), { value: statement, type: 'number' });
        if (_.isBoolean(statement))
            return _.merge({}, table_1.Table(this), boolean_1.Boolean(this), { value: statement, type: 'boolean' });
        if (_.isString(statement))
            return _.merge({}, table_1.Table(this), string_1.String(this), { value: statement, type: 'string' });
        return statement;
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
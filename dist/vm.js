"use strict";
var _ = require("lodash");
var table_1 = require("./types/table");
var number_1 = require("./types/number");
var string_1 = require("./types/string");
var boolean_1 = require("./types/boolean");
var Vm = (function () {
    function Vm() {
        this.memory = {};
    }
    Vm.prototype.eval = function (parseTree, parent, noTableExecution) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        if (noTableExecution === void 0) { noTableExecution = false; }
        //console.log(parseTree, parent);
        // Handle Primitives
        if (!_.isObject(parseTree))
            return this.wrapPrimitive(parseTree);
        // Handle Properties
        if (_.has(parseTree, '_property')) {
            return this.eval(_.get(parent, parseTree._property), parent);
        }
        // Handle Methods
        if (_.has(parseTree, '_method') && _.has(parseTree, '_args')) {
            var table = _.get(parent, parseTree._method);
            var args_1 = _.map(parseTree._args, function (arg) { return _this.eval(arg, parent, true); });
            // Is it a JS function
            if (parent && _.isFunction(table)) {
                args_1.unshift(parent);
                return this.wrapPrimitive(table(args_1, parent));
            }
            var resolvedArgs = _.reduce(table._args, function (acc, value, i) {
                return _.merge(acc, (_a = {}, _a[value._property] = args_1[i], _a));
                var _a;
            }, {});
            _.merge(table, resolvedArgs);
            //console.log(table);
            // Otherwise it's a pear-script table
            return this.eval(table, _.merge({}, parent, table));
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
        while (_.has(parseTree, ++maxKey)) {
            result = this.eval(parseTree[maxKey], parent);
        }
        return result;
    };
    Vm.prototype.wrapPrimitive = function (statement) {
        if (_.isNumber(statement))
            return _.merge({}, table_1.Table(this), number_1.Number(this), { value: statement, type: 'number' });
        if (_.isBoolean(statement))
            return _.merge({}, table_1.Table(this), boolean_1.Boolean(this), { value: statement, type: 'boolean' });
        if (_.isString(statement))
            return _.merge({}, table_1.Table(this), string_1.String(this), { value: statement, type: 'string' });
        if (_.isString(statement))
            return;
        return statement;
    };
    return Vm;
}());
exports.Vm = Vm;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/vm.js.map
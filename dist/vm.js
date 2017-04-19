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
    Vm.prototype.execute = function (parseTree, acc, level) {
        if (acc === void 0) { acc = this.memory; }
        if (level === void 0) { level = 0; }
        var output = null;
        while (parseTree.length > 0) {
            var statement = parseTree.shift();
            output = this.reduce(statement, acc, _.cloneDeep(this.memory), level);
        }
        return output;
    };
    Vm.prototype.reduce = function (statement, acc, closure, level) {
        var _this = this;
        if (_.isArray(statement)) {
            return _.reduce(statement, function (accChain, value, i) {
                var result = _this.reduce(value, accChain, closure, ++level);
                return result;
            }, acc);
        }
        else {
            statement = this.wrapPrimitive(statement);
            switch (statement.type) {
                case 'assignment': return this.handleAssignment(statement, acc, closure, level);
                case 'property': return this.handleProperty(statement, acc, closure);
                case 'method': return this.handleMethod(statement, acc, closure, level);
                case 'comment': break;
                default: return statement;
            }
        }
    };
    Vm.prototype.handleAssignment = function (statement, acc, closure, level) {
        var address = _.isArray(statement.parent) ? _.map(statement.parent, 'value') : statement.parent.value;
        return _.cloneDeep(_.set(acc, address, this.reduce(statement.child, acc, closure, ++level)));
    };
    Vm.prototype.handleProperty = function (statement, acc, closure) {
        var result = _.get(_.merge({}, closure, acc), statement.value || statement);
        if (_.isNil(result))
            throw "Error: Could not find key '" + statement.value + "'";
        return result;
    };
    Vm.prototype.handleMethod = function (statement, acc, closure, level) {
        var _this = this;
        var method = this.handleProperty(statement.method, acc, closure);
        var args = _.map(statement.args, function (arg) { return _this.reduce(arg, acc, closure, ++level); });
        if (_.isFunction(method)) {
            args.unshift(acc);
            return this.wrapPrimitive(method(args, acc, closure, level));
        }
        else {
            if (_.isNil(method))
                throw "Error: Could not find key '" + statement.method + "'";
            var mappedArgs = _.map(method.args, function (arg, i) {
                return (_a = {}, _a[arg.value] = args[i], _a);
                var _a;
            });
            var tableClosure = _.assign.apply(_, [{}, closure, acc].concat(mappedArgs));
            return this.wrapPrimitive(this.reduce(method.block, tableClosure, tableClosure, ++level));
        }
    };
    Vm.prototype.wrapPrimitive = function (statement) {
        if (_.isNumber(statement))
            return _.merge({}, table_1.Table(this), number_1.Number(this), { value: statement, type: 'number' });
        if (_.isBoolean(statement))
            return _.merge({}, table_1.Table(this), boolean_1.Boolean(this), { value: statement, type: 'boolean' });
        if (_.isString(statement))
            return _.merge({}, table_1.Table(this), string_1.String(this), { value: statement, type: 'string' });
        return statement;
    };
    Vm.prototype.runTable = function (table, acc, scope, level, args) {
        var key = _.uniqueId('__methodCall');
        acc[key] = table;
        var result = this.reduce({ type: 'method', method: key, args: args }, acc, scope, ++level);
        _.unset(acc, key);
        return result;
    };
    return Vm;
}());
exports.Vm = Vm;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/vm.js.map
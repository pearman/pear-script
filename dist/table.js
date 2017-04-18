"use strict";
var _ = require("lodash");
var boolean_1 = require("./boolean");
var Table = (function () {
    function Table(value) {
        var _this = this;
        this.value = undefined;
        this.args = [];
        _.assign(this, {
            set: function (property, value) {
                _this[property.value] = value;
                return _this;
            },
            get: function (property) {
                return _this[property.value];
            },
            getIndex: function (property) {
                return _this["#" + property.value];
            },
            has: function (property) {
                return new boolean_1.Boolean(_.isUndefined(_this[property.value]));
            },
            return: function (value) {
                _this.value = value;
                return _.cloneDeep(_this.value);
            },
            print: function (value) {
                var output = (_.isUndefined(value.value)) ? value : value.value;
                console.log(output);
                return output;
            },
            fullPrint: function (value) {
                console.log(JSON.stringify(value, null, 2));
                return value;
            },
            new: function (value) {
                return _.cloneDeep(value);
            }
        });
    }
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/table.js.map
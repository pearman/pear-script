"use strict";
var _ = require("lodash");
var table_1 = require("./table");
var Boolean = (function () {
    function Boolean(value) {
        var _this = this;
        var tableDefaults = new table_1.Table();
        _.assign(this, new table_1.Table(), {
            then: function (x, y) {
                return (_this.value) ? x : y;
            },
            and: function (x) {
                return new Boolean(_this.value && x.value);
            },
            not: function () {
                return new Boolean(!_this.value);
            },
            is: function (x) {
                return new Boolean(_this.value === x.value);
            }
        });
    }
    return Boolean;
}());
exports.Boolean = Boolean;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/boolean.js.map
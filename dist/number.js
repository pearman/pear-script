"use strict";
var _ = require("lodash");
var table_1 = require("./table");
var boolean_1 = require("./boolean");
var Number = (function () {
    function Number(value) {
        var _this = this;
        _.assign(this, new table_1.Table(), {
            plus: function (x) {
                return new Number(_this.value + x.value);
            },
            minus: function (x) {
                return new Number(_this.value - x.value);
            },
            divide: function (x) {
                return new Number(_this.value / x.value);
            },
            times: function (x) {
                return new Number(_this.value * x.value);
            },
            squared: function () {
                return new Number(_this.value * _this.value);
            },
            sqrt: function () {
                return new Number(Math.sqrt(_this.value));
            },
            abs: function () {
                return new Number(Math.abs(_this.value));
            },
            is: function (value) {
                return new boolean_1.Boolean(_this.value === value.value);
            }
        });
    }
    return Number;
}());
exports.Number = Number;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/number.js.map
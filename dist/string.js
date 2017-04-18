"use strict";
var _ = require("lodash");
var boolean_1 = require("./boolean");
var String = (function () {
    function String(value) {
        var _this = this;
        _.assign(this, {
            plus: function (x) {
                return new String(_this.value + x.value);
            },
            includes: function (x) {
                return new boolean_1.Boolean(_.includes(_this.value, x.value));
            },
            is: function (x) {
                return new boolean_1.Boolean(_.isEqual(_this.value, x.value));
            }
        });
    }
    return String;
}());
exports.String = String;
//# sourceMappingURL=/Users/gabepearhill/Documents/g-lang/string.js.map
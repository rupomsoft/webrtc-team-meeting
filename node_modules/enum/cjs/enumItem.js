"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isType = require("./isType.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents an Item of an Enum.
 * @param {String} key   The Enum key.
 * @param {Number} value The Enum value.
 */
var EnumItem = /*#__PURE__*/function () {
  /* constructor reference so that, this.constructor===EnumItem//=>true */
  function EnumItem(key, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, EnumItem);

    this.key = key;
    this.value = value;
    this._options = options;
    this._options.ignoreCase = this._options.ignoreCase || false;
  }
  /**
   * Checks if the flagged EnumItem has the passing object.
   * @param  {EnumItem || String || Number} value The object to check with.
   * @return {Boolean}                            The check result.
   */


  _createClass(EnumItem, [{
    key: "has",
    value: function has(value) {
      if (EnumItem.isEnumItem(value)) {
        return (this.value & value.value) !== 0;
      } else if ((0, _isType.isString)(value)) {
        if (this._options.ignoreCase) {
          return this.key.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        }

        return this.key.indexOf(value) >= 0;
      } else {
        return (this.value & value) !== 0;
      }
    }
    /**
     * Checks if the EnumItem is the same as the passing object.
     * @param  {EnumItem || String || Number} key The object to check with.
     * @return {Boolean}                          The check result.
     */

  }, {
    key: "is",
    value: function is(key) {
      if (EnumItem.isEnumItem(key)) {
        return this.key === key.key;
      } else if ((0, _isType.isString)(key)) {
        if (this._options.ignoreCase) {
          return this.key.toLowerCase() === key.toLowerCase();
        }

        return this.key === key;
      } else {
        return this.value === key;
      }
    }
    /**
     * Returns String representation of this EnumItem.
     * @return {String} String representation of this EnumItem.
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.key;
    }
    /**
     * Returns JSON object representation of this EnumItem.
     * @return {String} JSON object representation of this EnumItem.
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.key;
    }
    /**
     * Returns the value to compare with.
     * @return {String} The value to compare with.
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
  }], [{
    key: "isEnumItem",
    value: function isEnumItem(value) {
      return value instanceof EnumItem || (0, _isType.isObject)(value) && value.key !== undefined && value.value !== undefined;
    }
  }]);

  return EnumItem;
}();

exports["default"] = EnumItem;
;
module.exports = exports.default;
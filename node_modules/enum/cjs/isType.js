"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = exports.isString = exports.isObject = exports.isType = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// eslint-disable-next-line valid-typeof
var isType = function isType(type, value) {
  return _typeof(value) === type;
};

exports.isType = isType;

var isObject = function isObject(value) {
  return isType('object', value);
};

exports.isObject = isObject;

var isString = function isString(value) {
  return isType('string', value);
};

exports.isString = isString;

var isNumber = function isNumber(value) {
  return isType('number', value);
};

exports.isNumber = isNumber;
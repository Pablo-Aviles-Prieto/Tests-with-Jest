"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oneSliceHandler = exports.lastSurvivors = exports.checkingForDuplicated = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// https://www.codewars.com/kata/60a1aac7d5a5fc0046c89651

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var lastSurvivors = function lastSurvivors(string) {
  var hasDuplicatedChars = checkingForDuplicated(string);
  return hasDuplicatedChars ? oneSliceHandler(string) : string;
};
exports.lastSurvivors = lastSurvivors;
var checkingForDuplicated = function checkingForDuplicated(string) {
  for (var i = 0; i < string.length; i++) {
    var regex = new RegExp("".concat(string[i]), 'g');
    var numberOfEqualLetters = _toConsumableArray(string.matchAll(regex)).length;
    if (numberOfEqualLetters > 1) return true;
  }
  return false;
};
exports.checkingForDuplicated = checkingForDuplicated;
var oneSliceHandler = function oneSliceHandler(string) {
  var stringToArray = string.split('');
  for (var i = 0; i < string.length; i++) {
    var regex = new RegExp("".concat(string[i]), 'g');
    var equalLetters = _toConsumableArray(string.matchAll(regex));
    var numberOfEqualLetters = _toConsumableArray(string.matchAll(regex)).length;
    if (numberOfEqualLetters > 1) {
      var _ret = function () {
        var numberOfNextLetters = Math.floor(numberOfEqualLetters / 2);
        var indexOfLetter = alphabet.indexOf(string[i]);
        var letter = '';
        letter = alphabet[indexOfLetter + 1];
        if (indexOfLetter === alphabet.length - 1) {
          letter = alphabet[0];
        }
        for (var _i = equalLetters.length - 1; _i >= 0; _i--) {
          stringToArray.splice(equalLetters[_i].index, 1);
        }
        if (numberOfEqualLetters % 2 !== 0) {
          stringToArray.push(string[i]);
        }
        _toConsumableArray(Array(numberOfNextLetters)).forEach(function (_, i) {
          stringToArray.push(letter);
        });
        var parsedString = _toConsumableArray(stringToArray).join('');
        return {
          v: lastSurvivors(parsedString)
        };
      }();
      if (_typeof(_ret) === "object") return _ret.v;
    }
  }
  throw new Error('Possible infinite loop detected');
};
exports.oneSliceHandler = oneSliceHandler;
console.log('result', lastSurvivors('xsdlafqpcmjytoikojsecamgdkehrqqgfknlhoudqygkbxftivfbpxhxtqgpkvsrfflpgrlhkbfnyftwkdebwfidmpauoteahyh'));

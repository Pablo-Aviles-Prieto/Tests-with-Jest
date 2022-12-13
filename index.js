"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Room = /*#__PURE__*/function () {
  function Room(_ref) {
    var name = _ref.name,
      bookings = _ref.bookings,
      rate = _ref.rate,
      discount = _ref.discount;
    _classCallCheck(this, Room);
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  // This method includes both start and end date in the range
  _createClass(Room, [{
    key: "isOccupied",
    value: function isOccupied(date) {
      if (!Array.isArray(this.bookings) || !this.bookings.length) {
        return false;
      }
      var roomIsOccupied = false;
      var concreteDay = date.getDate();
      this.bookings.forEach(function (booking) {
        if (!booking.checkIn || !booking.checkOut) return;
        var endDate = new Date(booking.checkOut);
        endDate.setDate(booking.checkOut.getDate() - 1);
        var rangeOfDates = Room.getDatesFromRangeSameMonth(booking.checkIn, endDate);
        if (!rangeOfDates.length) return;
        rangeOfDates.forEach(function (dayDate) {
          if (dayDate === concreteDay) roomIsOccupied = true;
        });
      });
      return roomIsOccupied;
    }
  }, {
    key: "occupancyPercentage",
    value: function occupancyPercentage(startDate, endDate) {
      var rangeOfTotalDates = Room.getDatesFromRangeSameMonth(startDate, endDate);
      if (!rangeOfTotalDates.length) return 0;
      var totalDaysToCheck = rangeOfTotalDates.length;
      var daysOccupied = 0;
      if (!this.bookings) return 0;
      this.bookings.forEach(function (booking) {
        if (!booking.checkIn || !booking.checkOut) return;
        var endDate = new Date(booking.checkOut);
        endDate.setDate(booking.checkOut.getDate() - 1);
        var rangeOfBookingsDates = Room.getDatesFromRangeSameMonth(booking.checkIn, endDate);
        rangeOfBookingsDates.forEach(function (bookingDate) {
          rangeOfTotalDates.forEach(function (totalDate) {
            if (bookingDate === totalDate) return daysOccupied += 1;
          });
        });
      });
      return Number((daysOccupied / totalDaysToCheck * 100).toFixed(2));
    }
  }], [{
    key: "getDatesFromRangeSameMonth",
    value: function getDatesFromRangeSameMonth(startDate, endDate) {
      var yearFromStart = startDate.getFullYear();
      var yearFromEnd = endDate.getFullYear();
      var monthFromStart = startDate.getMonth();
      var monthFromEnd = endDate.getMonth();
      if (yearFromStart !== yearFromEnd || monthFromStart !== monthFromEnd) {
        return [];
      }
      var initDay = startDate.getDate();
      var lastDay = endDate.getDate();
      if (lastDay <= initDay) return [];
      var arrayOfDates = [];
      for (var i = initDay; i <= lastDay; i++) {
        arrayOfDates.push(Number(i));
      }
      return arrayOfDates;
    }
  }, {
    key: "totalOccupancyPercentage",
    value: function totalOccupancyPercentage(rooms, startDate, endDate) {
      var _this = this;
      var rangeOfTotalDates = this.getDatesFromRangeSameMonth(startDate, endDate);
      if (!rangeOfTotalDates.length) return 0;
      var totalDaysToCheck = rangeOfTotalDates.length;
      var setted = new Set();
      rooms.forEach(function (room) {
        if (!room.bookings || !room.bookings.length) return;
        room.bookings.forEach(function (roomBooking) {
          if (!roomBooking.checkIn || !roomBooking.checkOut) return;
          var endDate = new Date(roomBooking.checkOut);
          endDate.setDate(roomBooking.checkOut.getDate() - 1);
          var rangeOfBookingsDates = _this.getDatesFromRangeSameMonth(roomBooking.checkIn, endDate);
          rangeOfBookingsDates.forEach(function (bookingDate) {
            rangeOfTotalDates.forEach(function (totalDate) {
              if (bookingDate === totalDate) {
                setted.add(bookingDate);
              }
            });
          });
        });
      });
      var daysOccupied = _toConsumableArray(setted);
      return Number((daysOccupied.length / totalDaysToCheck * 100).toFixed(2));
    }
  }, {
    key: "availableRooms",
    value: function availableRooms(rooms, startDate, endDate) {
      var _this2 = this;
      var rangeOfTotalDates = this.getDatesFromRangeSameMonth(startDate, endDate);
      if (!rangeOfTotalDates.length) return [];
      var availableRooms = [];
      rooms.forEach(function (room) {
        if (!room.bookings || !room.bookings.length) return;
        var roomIsOccupied = false;
        room.bookings.forEach(function (roomBooking, i) {
          if (!roomBooking.checkIn || !roomBooking.checkOut) return;
          var endDate = new Date(roomBooking.checkOut);
          endDate.setDate(roomBooking.checkOut.getDate() - 1);
          var rangeOfBookingsDates = _this2.getDatesFromRangeSameMonth(roomBooking.checkIn, endDate);
          rangeOfBookingsDates.forEach(function (bookingDate) {
            if (rangeOfTotalDates.includes(bookingDate)) roomIsOccupied = true;
          });
          if (i === room.bookings.length - 1 && !roomIsOccupied) availableRooms.push(room);
        });
      });
      return availableRooms;
    }
  }]);
  return Room;
}();
var Booking = /*#__PURE__*/function () {
  function Booking(_ref2) {
    var name = _ref2.name,
      email = _ref2.email,
      checkIn = _ref2.checkIn,
      checkOut = _ref2.checkOut,
      discount = _ref2.discount,
      room = _ref2.room;
    _classCallCheck(this, Booking);
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }
  _createClass(Booking, [{
    key: "getFee",
    value: function getFee() {
      var endDate = new Date(this.checkOut);
      endDate.setDate(this.checkOut.getDate() - 1);
      var rangeOfDates = Room.getDatesFromRangeSameMonth(this.checkIn, endDate);
      if (!rangeOfDates.length) return 0;
      var totalRate = this.room.rate * rangeOfDates.length;
      if (this.discount) {
        var discountedRate = totalRate * this.discount / 100;
        totalRate = totalRate - discountedRate;
      }
      if (this.room.discount) {
        var roomDiscountRate = totalRate * this.room.discount / 100;
        totalRate = totalRate - roomDiscountRate;
      }
      return Number(totalRate.toFixed(2));
    }
  }]);
  return Booking;
}();
module.exports = {
  Room: Room,
  Booking: Booking
};

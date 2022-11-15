class Room {
  constructor(params) {
    this.name = params.name;
    this.bookings = params.bookings;
    this.rate = params.rate;
    this.discount = params.discount;
  }

  isOccupied(date) {
    if (!Array.isArray(this.bookings) || !this.bookings.length) {
      return false;
    }
    let roomIsOccupied = false;
    this.bookings.forEach((booking) => {
      if (date >= booking.checkIn && date < booking.checkOut) {
        roomIsOccupied = true;
      }
    });
    return roomIsOccupied;
  }

  occupancyPercentage(startDate, endDate) {}

  static totalOccupancyPercentage(rooms, startDate, endDate) {}

  static availableRooms(rooms, startDate, endDate) {}
}

class Booking {
  constructor(params) {
    this.name = params.name;
    this.email = params.email;
    this.checkIn = params.checkIn;
    this.checkOut = params.checkOut;
    this.discount = params.discount;
    this.room = params.room;
  }

  getFee() {}
}

module.exports = { Room, Booking };

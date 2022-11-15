class Room {
  constructor(params) {
    // this.name = params.name
    // this.bookings = params.bookings
    // this.rate = params.rate
    // this.discount = params.discount
  }

  isOccupied(date) {}

  occupancyPercentage(startDate, endDate) {}

  static totalOccupancyPercentage(rooms, startDate, endDate) {}

  static availableRooms(rooms, startDate, endDate) {}
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {}

  getFee() {}
}

module.exports = { Room, Booking };

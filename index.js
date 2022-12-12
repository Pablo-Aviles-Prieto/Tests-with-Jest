class Room {
  constructor(params) {
    this.name = params.name;
    this.bookings = params.bookings;
    this.rate = params.rate;
    this.discount = params.discount;
  }

  // This method includes both start and end date in the range
  static getDatesFromRangeSameMonth(startDate, endDate) {
    const yearFromStart = startDate.getFullYear();
    const yearFromEnd = endDate.getFullYear();
    const monthFromStart = startDate.getMonth();
    const monthFromEnd = endDate.getMonth();
    if (yearFromStart !== yearFromEnd || monthFromStart !== monthFromEnd) {
      return [];
    }

    const initDay = startDate.getDate();
    const lastDay = endDate.getDate();
    if (lastDay <= initDay) return [];

    const arrayOfDates = [];
    for (let i = initDay; i <= lastDay; i++) {
      arrayOfDates.push(Number(i));
    }
    return arrayOfDates;
  }

  isOccupied(date) {
    if (!Array.isArray(this.bookings) || !this.bookings.length) {
      return false;
    }

    let roomIsOccupied = false;
    const concreteDay = date.getDate();
    this.bookings.forEach((booking) => {
      if (!booking.checkIn || !booking.checkOut) return;
      const endDate = new Date(booking.checkOut);
      endDate.setDate(booking.checkOut.getDate() - 1);

      const rangeOfDates = Room.getDatesFromRangeSameMonth(
        booking.checkIn,
        endDate
      );
      if (!rangeOfDates.length) return;

      rangeOfDates.forEach((dayDate) => {
        if (dayDate === concreteDay) roomIsOccupied = true;
      });
    });
    return roomIsOccupied;
  }

  occupancyPercentage(startDate, endDate) {
    const rangeOfTotalDates = Room.getDatesFromRangeSameMonth(
      startDate,
      endDate
    );
    if (!rangeOfTotalDates.length) return 0;
    const totalDaysToCheck = rangeOfTotalDates.length;
    let daysOccupied = 0;

    if (!this.bookings) return 0;

    this.bookings.forEach((booking) => {
      if (!booking.checkIn || !booking.checkOut) return;
      const endDate = new Date(booking.checkOut);
      endDate.setDate(booking.checkOut.getDate() - 1);
      const rangeOfBookingsDates = Room.getDatesFromRangeSameMonth(
        booking.checkIn,
        endDate
      );

      rangeOfBookingsDates.forEach((bookingDate) => {
        rangeOfTotalDates.forEach((totalDate) => {
          if (bookingDate === totalDate) return (daysOccupied += 1);
        });
      });
    });

    return Number(((daysOccupied / totalDaysToCheck) * 100).toFixed(2));
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    const rangeOfTotalDates = this.getDatesFromRangeSameMonth(
      startDate,
      endDate
    );
    if (!rangeOfTotalDates.length) return 0;
    const totalDaysToCheck = rangeOfTotalDates.length;
    const setted = new Set();

    rooms.forEach((room) => {
      if (!room.bookings || !room.bookings.length) return;
      room.bookings.forEach((roomBooking) => {
        if (!roomBooking.checkIn || !roomBooking.checkOut) return;
        const endDate = new Date(roomBooking.checkOut);
        endDate.setDate(roomBooking.checkOut.getDate() - 1);
        const rangeOfBookingsDates = this.getDatesFromRangeSameMonth(
          roomBooking.checkIn,
          endDate
        );

        rangeOfBookingsDates.forEach((bookingDate) => {
          rangeOfTotalDates.forEach((totalDate) => {
            if (bookingDate === totalDate) {
              setted.add(bookingDate);
            }
          });
        });
      });
    });
    const daysOccupied = [...setted];
    return Number(((daysOccupied.length / totalDaysToCheck) * 100).toFixed(2));
  }

  static availableRooms(rooms, startDate, endDate) {
    const rangeOfTotalDates = this.getDatesFromRangeSameMonth(
      startDate,
      endDate
    );
    if (!rangeOfTotalDates.length) return 0;
    const availableRooms = [];

    rooms.forEach((room) => {
      if (!room.bookings || !room.bookings.length) return;
      let roomIsOccupied = false;

      room.bookings.forEach((roomBooking, i) => {
        if (!roomBooking.checkIn || !roomBooking.checkOut) return;
        const endDate = new Date(roomBooking.checkOut);
        endDate.setDate(roomBooking.checkOut.getDate() - 1);
        const rangeOfBookingsDates = this.getDatesFromRangeSameMonth(
          roomBooking.checkIn,
          endDate
        );

        rangeOfBookingsDates.forEach((bookingDate) => {
          if (rangeOfTotalDates.includes(bookingDate)) roomIsOccupied = true;
        });

        if (i === room.bookings.length - 1 && !roomIsOccupied)
          availableRooms.push(room);
      });
    });
    return availableRooms;
  }
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

  getFee() {
    const endDate = new Date(this.checkOut);
    endDate.setDate(this.checkOut.getDate() - 1);
    const rangeOfDates = Room.getDatesFromRangeSameMonth(this.checkIn, endDate);
    if (!rangeOfDates.length) return 0;

    let totalRate = this.room.rate * rangeOfDates.length;

    if (this.discount) {
      const discountedRate = (totalRate * this.discount) / 100;
      totalRate = totalRate - discountedRate;
    }
    if (this.room.discount) {
      const roomDiscountRate = (totalRate * this.room.discount) / 100;
      totalRate = totalRate - roomDiscountRate;
    }

    return Number(totalRate.toFixed(2));
  }
}

module.exports = { Room, Booking };

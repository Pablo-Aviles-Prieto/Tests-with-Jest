type BookingParams = {
  name: string;
  email: string;
  discount: number;
  checkIn: Date;
  checkOut: Date;
  room: any;
};

interface BookingMethods {
  getFee(): number;
}

type RoomParams = {
  name: string;
  bookings: any[]
  rate: number;
  discount: number;
};

interface RoomMethods {
  isOccupied(date: Date): boolean;
  occupancyPercentage(startDate: Date, endDate: Date): number;
}

export class Room implements RoomMethods {
  name: string;
  bookings: BookingParams[];
  rate: number;
  discount: number;
  constructor({ name, bookings, rate, discount }: RoomParams) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  // This method includes both start and end date in the range
  static getDatesFromRangeSameMonth(startDate: Date, endDate: Date): any[] {
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

    const arrayOfDates: number[] = [];
    for (let i: number = initDay; i <= lastDay; i++) {
      arrayOfDates.push(Number(i));
    }
    return arrayOfDates;
  }

  isOccupied(date: Date): boolean {
    if (!Array.isArray(this.bookings) || !this.bookings.length) {
      return false;
    }

    let roomIsOccupied: boolean = false;
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

  occupancyPercentage(startDate: Date, endDate: Date): number {
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

  static totalOccupancyPercentage(
    rooms: RoomParams[],
    startDate: Date,
    endDate: Date
  ): number {
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

  static availableRooms(
    rooms: RoomParams[],
    startDate: Date,
    endDate: Date
  ): RoomParams[] {
    const rangeOfTotalDates = this.getDatesFromRangeSameMonth(
      startDate,
      endDate
    );
    if (!rangeOfTotalDates.length) return [];
    const availableRooms: RoomParams[] = [];

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

export class Booking implements BookingMethods {
  name: string;
  email: string;
  discount: number;
  room: RoomParams;
  checkIn: Date;
  checkOut: Date;
  constructor({
    name,
    email,
    checkIn,
    checkOut,
    discount,
    room,
  }: BookingParams) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee(): number {
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

import { Room, Booking } from './index';
import { BookingManagementMother } from './test.helper';

describe('Room', () => {
  test('is available when bookings is NOT an array or have 0 length', () => {
    const room = new Room(BookingManagementMother.createRoom({ bookings: [] }));
    expect(room.isOccupied(new Date('2022-11-17'))).toBe(false);
  });

  test('is occupied when date concur with check-in', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    console.log({ fakeBooking });
    room.bookings = [fakeBooking];
    expect(room.isOccupied(new Date('2022-11-17'))).toBe(true);
  });

  test('is available when date concur with check-out', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    room.bookings = [fakeBooking];
    expect(room.isOccupied(new Date('2022-11-21'))).toBe(false);
  });

  test('is occupied when date is between check-in and check-out', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    room.bookings = [fakeBooking];
    expect(room.isOccupied(new Date('2022-11-18'))).toBe(true);
  });

  test('is available when date is NOT between check-in and check-out', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    const fakeBooking2 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-23'),
      checkOut: new Date('2022-11-28'),
    });
    room.bookings = [fakeBooking, fakeBooking2];
    expect(room.isOccupied(new Date('2022-11-22'))).toBe(false);
  });

  test('has 50% occupancy in a single booking for the dates selected', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-15'),
      checkOut: new Date('2022-11-23'),
    });
    room.bookings = [fakeBooking];
    expect(
      room.occupancyPercentage(new Date('2022-11-15'), new Date('2022-11-30'))
    ).toEqual(50);
  });

  test('has less than 25% occupancy for the dates selected', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-04'),
      checkOut: new Date('2022-11-07'),
    });
    const fakeBooking2 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-18'),
      checkOut: new Date('2022-11-21'),
    });
    room.bookings = [fakeBooking, fakeBooking2];
    expect(
      room.occupancyPercentage(new Date('2022-11-01'), new Date('2022-11-30'))
    ).toBeLessThan(25);
  });

  test('has 0% occupancy when NO bookings provided', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date(''),
      checkOut: new Date(''),
    });
    room.bookings = [fakeBooking];
    expect(
      room.occupancyPercentage(new Date('2022-11-01'), new Date('2022-11-30'))
    ).toEqual(0);
  });

  test('has 0% occupancy when NO check-in or check-out provided', () => {
    const room = new Room(BookingManagementMother.createRoom());
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-18'),
      checkOut: new Date(''),
    });
    room.bookings = [fakeBooking];
    expect(
      room.occupancyPercentage(new Date('2022-11-01'), new Date('2022-11-30'))
    ).toEqual(0);
  });
});

describe('Total occupancy', () => {
  test('is 100% for the data provided', () => {
    const room = BookingManagementMother.createRoom();
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-01'),
      checkOut: new Date('2022-11-14'),
    });
    room.bookings = [fakeBooking];

    const room2 = BookingManagementMother.createRoom();
    const fakeBooking2 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-10'),
      checkOut: new Date('2022-11-30'),
    });
    room2.bookings = [fakeBooking2];

    expect(
      Room.totalOccupancyPercentage(
        [room, room2],
        new Date('2022-11-01'),
        new Date('2022-11-29')
      )
    ).toEqual(100);
  });

  test('is less than half for the data provided', () => {
    const room = BookingManagementMother.createRoom();
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-01'),
      checkOut: new Date('2022-11-10'),
    });
    room.bookings = [fakeBooking];

    const room2 = BookingManagementMother.createRoom();
    const fakeBooking2 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-10'),
      checkOut: new Date('2022-11-14'),
    });
    room2.bookings = [fakeBooking2];

    const room3 = BookingManagementMother.createRoom();
    const fakeBooking3 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-10'),
      checkOut: new Date('2022-11-14'),
    });
    room3.bookings = [fakeBooking2, fakeBooking3];

    const result = Room.totalOccupancyPercentage(
      [room, room2, room3],
      new Date('2022-11-01'),
      new Date('2022-11-29')
    );

    expect(result).toBeLessThan(50);
    expect(result).toEqual(expect.any(Number));
  });
});

describe('Quantity of rooms available', () => {
  test('2 rooms available for dates provided', () => {
    const room = BookingManagementMother.createRoom();
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-03'),
      checkOut: new Date('2022-11-05'),
    });
    room.bookings = [fakeBooking];

    const room2 = BookingManagementMother.createRoom();
    const fakeBooking2 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-20'),
      checkOut: new Date('2022-11-24'),
    });
    room2.bookings = [fakeBooking2];

    const room3 = BookingManagementMother.createRoom();
    const fakeBooking3 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-24'),
      checkOut: new Date('2022-11-27'),
    });
    room3.bookings = [fakeBooking2, fakeBooking3];

    const result = Room.availableRooms(
      [room, room2, room3],
      new Date('2022-11-01'),
      new Date('2022-11-08')
    );

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
  });

  test('NO rooms available for dates provided', () => {
    const room = BookingManagementMother.createRoom();
    const fakeBooking = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-03'),
      checkOut: new Date('2022-11-10'),
    });
    room.bookings = [fakeBooking];

    const room2 = BookingManagementMother.createRoom();
    const fakeBooking2 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-11'),
      checkOut: new Date('2022-11-15'),
    });
    room2.bookings = [fakeBooking2];

    const room3 = BookingManagementMother.createRoom();
    const fakeBooking3 = BookingManagementMother.createBooking({
      checkIn: new Date('2022-11-20'),
      checkOut: new Date('2022-11-27'),
    });
    room3.bookings = [fakeBooking2, fakeBooking3];

    const result = Room.availableRooms(
      [room, room2, room3],
      new Date('2022-11-09'),
      new Date('2022-11-21')
    );

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });
});

describe('Booking', () => {
  test('returns 803.25 when 150/night, 7days, 15% and 10%', () => {
    const booking = new Booking(
      BookingManagementMother.createBooking({
        checkIn: new Date('2022-11-03'),
        checkOut: new Date('2022-11-10'),
        discount: 15,
      })
    );
    const room = BookingManagementMother.createRoom({
      rate: 150,
      discount: 10,
    });
    booking.room = room;

    const result = booking.getFee();
    expect(result).toEqual(803.25);
    expect(result).toEqual(expect.any(Number));
  });

  test('returns 1050 when 150/night, 7days, no discounts', () => {
    const booking = new Booking(
      BookingManagementMother.createBooking({
        checkIn: new Date('2022-11-03'),
        checkOut: new Date('2022-11-10'),
        discount: 0,
      })
    );
    const room = BookingManagementMother.createRoom({ rate: 150, discount: 0 });
    booking.room = room;

    const result = booking.getFee();
    expect(result).toEqual(1050);
    expect(result).toEqual(expect.any(Number));
  });
});

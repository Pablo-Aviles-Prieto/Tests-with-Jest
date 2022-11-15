const { Room, Booking } = require('./index');

const ROOM_TEMPLATE = {
  name: 'Supreme Deluxe II',
  rate: 149.99,
  discount: 10,
};

const BOOKING_TEMPLATE = {
  name: 'Manolito García',
  email: 'manolito@garcia.com',
  discount: 15,
};

describe('Room', () => {
  test('is available when bookings is NOT an array or have 0 length', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    expect(room.isOccupied(new Date('2022-11-17'))).toBe(false);
  });

  test('is available when there are NO check-ins nor check-outs', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    const firstFakeBooking = new Booking({ ...BOOKING_TEMPLATE });
    const secondFakeBooking = new Booking({ ...BOOKING_TEMPLATE });
    // Passing bookings without checkIn or checkOut props
    room.bookings = [firstFakeBooking, secondFakeBooking];
    expect(room.isOccupied(new Date('2022-11-17'))).toBe(false);
  });

  test('is occupied when date concur with check-in', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    const fakeBooking = new Booking({
      ...BOOKING_TEMPLATE,
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    room.bookings = [fakeBooking];
    expect(room.isOccupied(new Date('2022-11-17'))).toBe(true);
  });

  test('is available when date concur with check-out', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    const fakeBooking = new Booking({
      ...BOOKING_TEMPLATE,
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    room.bookings = [fakeBooking];
    expect(room.isOccupied(new Date('2022-11-21'))).toBe(false);
  });

  test('is occupied when date is between check-in and check-out', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    const fakeBooking = new Booking({
      ...BOOKING_TEMPLATE,
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    room.bookings = [fakeBooking];
    expect(room.isOccupied(new Date('2022-11-18'))).toBe(true);
  });

  test('is available when date is NOT between check-in and check-out', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    const fakeBooking = new Booking({
      ...BOOKING_TEMPLATE,
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-21'),
    });
    const fakeBooking2 = new Booking({
      ...BOOKING_TEMPLATE,
      checkIn: new Date('2022-11-23'),
      checkOut: new Date('2022-11-28'),
    });
    room.bookings = [fakeBooking, fakeBooking2];
    expect(room.isOccupied(new Date('2022-11-21'))).toBe(false);
  });
});

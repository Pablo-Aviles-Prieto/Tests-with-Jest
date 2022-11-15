const { Room, Booking } = require('./index');

const ROOM_TEMPLATE = {
  name: 'Supreme Deluxe II',
  rate: 149.99,
  discount: 10,
};

const BOOKING_TEMPLATE = {}

describe('Room', () => {
  test('when NO bookings room is always available', () => {
    const room = new Room({ ...ROOM_TEMPLATE });
    const firstFakeBooking = new Booking();
    const secondFakeBooking = new Booking();
    room.bookings = [firstFakeBooking, secondFakeBooking];

    expect(room.isOccupied('2022-11-15T00:40:36.518Z')).toBe(false);
  });
});

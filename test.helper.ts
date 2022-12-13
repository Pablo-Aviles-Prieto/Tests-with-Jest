import { faker } from '@faker-js/faker';

import { BookingParams, RoomParams } from './index';

export class BookingManagementMother {
  static createBooking(params?: Partial<BookingParams>): BookingParams {
    const ROOM_TEMPLATE: RoomParams = {
      name: faker.company.name(),
      rate: faker.datatype.number({ min: 99, max: 1000 }),
      discount: faker.datatype.number({ min: 0, max: 50 }),
      bookings: [],
    };

    const defaultParams: BookingParams = {
      name: faker.random.word(),
      email: faker.internet.email(),
      discount: faker.datatype.number({ min: 0, max: 50 }),
      checkIn: new Date('2022-11-17'),
      checkOut: new Date('2022-11-19'),
      room: ROOM_TEMPLATE,
      ...params,
    };

    return defaultParams;
  }
  static createRoom(params?: Partial<RoomParams>): RoomParams {
    const defaultParams: RoomParams = {
      name: faker.company.name(),
      rate: faker.datatype.number({ min: 99, max: 1000 }),
      discount: faker.datatype.number({ min: 0, max: 50 }),
      bookings: [this.createBooking()],
      ...params,
    };

    return defaultParams;
  }
}

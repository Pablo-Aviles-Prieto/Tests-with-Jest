import { faker } from '@faker-js/faker';

export type IUserObj = {
  name: string;
  email: string;
};

export interface UserMethods {
  createUser(): IUserObj;
}

export class User implements UserMethods {
  name: string;
  email: string;
  constructor({ name, email }) {
    this.name = name;
    this.email;
    email;
  }

  createUser() {
    return { name: this.name, email: this.email };
  }

  static greetUser(userObj: IUserObj): void {
    console.log(`Welcome ${userObj.name} with email ${userObj.email}`);
  }

  static getUsers(numberUsersToGenerate: number): IUserObj[] {
    return [...Array(numberUsersToGenerate)].map((_) => ({
      name: faker.name.fullName(),
      email: faker.internet.email(),
    }));
  }
}

const greetings = (numberOfUsersToCreate: number) => {
  const newUsers = User.getUsers(numberOfUsersToCreate);
  newUsers.forEach((user) =>
    User.greetUser({ name: user.name, email: user.email })
  );
};

greetings(10);

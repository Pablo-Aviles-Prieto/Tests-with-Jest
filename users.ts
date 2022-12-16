import { faker } from '@faker-js/faker';

export type IUserObj = {
  name: string;
  email: string;
};

export interface UserMethods {
  createUser(): { name: string; email: string };
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
    const newUsersArray = [
      ...Array(numberUsersToGenerate).map((_, index) => {
        const newUser = new User({
          name: faker.name.fullName(),
          email: faker.internet.email(),
        });
        return newUser;
      }),
    ];
    console.log('newUsersArray', newUsersArray);
    return newUsersArray;
  }
}

const greetings = () => {
  const newUsers = User.getUsers(10);
  newUsers.forEach((user) =>
    User.greetUser({ name: user.name, email: user.email })
  );
};

console.log('function', greetings);

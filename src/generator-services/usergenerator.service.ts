import { faker } from '@faker-js/faker';
import { User } from '../models/user.interface';


export class UserGenerator {
  static generateUser(): User {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode()
      },
      jobTitle: faker.person.jobTitle(),
      phoneNumber: faker.phone.number()
    };
  }

  static generateUsers(count: number): User[] {
    return Array.from({ length: count }, () => this.generateUser());
  }
}
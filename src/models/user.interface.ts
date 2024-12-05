export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    address: {
      street: string;
      city: string;
      country: string;
      zipCode: string;
    };
    jobTitle: string;
    phoneNumber: string;
  }
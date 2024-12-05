import { User } from "../models/user.interface";
import { UserGenerator } from "./usergenerator.service";

export class UserService {
    private users: User[] = [];

    generateUsers(count: number = 20): void {
        this.users = UserGenerator.generateUsers(count);
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUser(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    getUsersByCity(city: string): User[]{
        return this.users.filter(user => user.address.city === city.toLowerCase());
    }
}
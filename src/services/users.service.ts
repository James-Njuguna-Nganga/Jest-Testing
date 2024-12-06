import { User } from "../models/user.interface";
import { UserGenerator } from "../generator-services/usergenerator.service";

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
        if(!city) return [];

    const filteredUsers = this.users.filter(user => 
            user.address.city.toLowerCase().includes(city.toLowerCase())
        );
        if(filteredUsers.length > 0)
        {
        
        filteredUsers.slice(0,5).forEach(user => {
                console.log(`${user.address.city}`);
            })
            
        }
        
        
        return filteredUsers;
    }
}
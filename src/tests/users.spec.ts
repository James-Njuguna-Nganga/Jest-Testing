import { UserService } from "../services/users.service";

describe('User Service', () => {
    let userService : UserService;

    beforeEach(() => {
        userService =new UserService();
        userService.generateUsers(20);
    });

    it('should generate 20 users', () => {
        const users = userService.getAllUsers();
        expect(users.length).toEqual(20);
    })

    it('should fetch a user by ID', () => {
        const allUsers = userService.getAllUsers();
        const userId = allUsers[1].id; 
        const user = userService.getUser(userId);
    
        expect(user).toBeDefined();
        expect(user?.id).toEqual(userId);
    });

    it('should return all users', () => {
        const users = userService.getAllUsers();
        expect(users.length).toEqual(20); 
    });
    it('should fetch users by city', () => {
        const allUsers = userService.getAllUsers();
        const specificCity = allUsers[0].address.city.toLowerCase();
        const usersByCity = userService.getUsersByCity(specificCity);
    
        expect(usersByCity.length).toBeGreaterThan(0);
        usersByCity.forEach(user => {
            expect(user.address.city.toLowerCase()).toEqual(specificCity);
        });
    });
    
    
    it('should return an empty array when no users are found in the specified city', () => {
        const usersByCity = userService.getUsersByCity('non-existent-city');
        expect(usersByCity).toEqual([]);
    });
});

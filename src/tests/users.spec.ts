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
    
});
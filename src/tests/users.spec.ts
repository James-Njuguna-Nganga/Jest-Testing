import { UserService } from "../services/users.service";

describe('User Service', () => {
    let userService : UserService;

    beforeEach(() => {
        userService =new UserService();
        userService.generateUsers(20);
    });

    it('should generate 20 users', () => {
        const users = userService.getAllUsers();
        expect(users.length).toMatchInlineSnapshot(`20`);
    });
    
    it('should fetch a user by ID', () => {
        const allUsers = userService.getAllUsers();
        const userId = allUsers[1].id; 
        const user = userService.getUser(userId);
    
        expect(user).toMatchInlineSnapshot(`
{
  "address": {
    "city": "New Ashleeboro",
    "country": "Cote d'Ivoire",
    "street": "107 Kuhic Garden",
    "zipCode": "85379-0969",
  },
  "avatar": "https://avatars.githubusercontent.com/u/20557100",
  "email": "Jacques_Watsica@gmail.com",
  "firstName": "Kali",
  "id": "b726d2eb-8c21-413a-841b-f50e0e3f20bd",
  "jobTitle": "Human Research Technician",
  "lastName": "Beatty-Roberts",
  "phoneNumber": "(301) 640-9864 x59137",
}
`);
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

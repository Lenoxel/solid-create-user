import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
    private users: User[] = [];

    findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return Promise.resolve(user);
    }

    save(user: User): Promise<void> {
       this.users.push(user);

       return Promise.resolve();
    }
}
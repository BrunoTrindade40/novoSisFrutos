import { User } from "../../models/users";
import { IUsersRepository } from "./../../controllers/protocols";

export class repositoryUsersDB implements IUsersRepository {
  async getUsers(): Promise<User[]> {
    const userTeste: User[] = [
      {
        id: 1,
        firstName: "Bruno",
        lastName: "Trindade",
        email: "bruno@trindade.com",
        senha: "123456",
      },
    ];
    return Promise.resolve(userTeste);
  }
  async getUser(id: number): Promise<User | null> {
    return Promise.resolve(null);
  }
}

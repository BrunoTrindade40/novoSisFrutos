import { User } from "../models/users";
import {
  IUsersController,
  IUsersRepository,
  HttpRequest,
  HttpResponse,
} from "./protocols";
export class UsersController implements IUsersController {
  constructor(private readonly usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }
  async handleGetUsers(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.usersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro ao buscar usuários.",
        error: error,
      };
    }
  }

  async handleGetUser(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | null>> {
    try {
      const { id } = httpRequest.params;
      const user = await this.usersRepository.getUser(Number(id)); // Assumindo que o ID é numérico
      if (!user) {
        return {
          statusCode: 404,
          body: "Usuário não encontrado.",
        };
      }
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro ao buscar usuário.",
        error: error,
      };
    }
  }
}

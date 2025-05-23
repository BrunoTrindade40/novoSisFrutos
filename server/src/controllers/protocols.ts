import { User } from "../models/users";

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
  error?: any;
}

export interface HttpRequest<B> {
  body?: B;
  params?: any;
}
export interface IUsersRepository {
  getUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | null>; // Read Single
  /* createUser(user: Omit<User, "id">): Promise<User>; // Create (omitindo o 'id' que geralmente é gerado)
  updateUser(id: number, userData: Partial<User>): Promise<User | null>; // Update (Partial permite atualizar apenas alguns campos)
  deleteUser(id: number): Promise<boolean>; // Delete (retorna true se deletou com sucesso)
 */
}

export interface IUsersController {
  handleGetUsers(): Promise<HttpResponse<User[]>>;
  handleGetUser(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | null>>;
  /* handleCreateUser(
    httpRequest: HttpRequest<Omit<User, "id">>
  ): Promise<HttpResponse<User>>;
  handleUpdateUser(
    httpRequest: HttpRequest<Partial<User>>
  ): Promise<HttpResponse<User | null>>;
  handleDeleteUser(
    httpRequest: HttpRequest<{ id: number }>
  ): Promise<HttpResponse<boolean>>; */
}
export interface CaixasPaletizadaMobileResult {
  fkpalet: number;
  idromaneio: number;
  rom_romaneio: string;
  rom_talhao: string;
  rom_dtcolheita: string;
  rom_dtchegada: string; 
  emp_razaoSocial: string;
  fkempresa: number;
  endereco: string;
  cidade: string;
  pro_descricao: string;
  tam_descricao: string;
  cai_descricao: string;
  Cademb_nome: string;
  palcai_qtd: number; // Ou number/Decimal
  palcai_peso: number; // Ou number/Decimal
  // Adicione a propriedade 'codigo' que você adiciona no final
  codcaixa?: string; // Opcional, pois você o adiciona depois
}
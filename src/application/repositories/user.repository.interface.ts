import { User } from "@/src/entities/models/user";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: User["id"]): Promise<User>;
}

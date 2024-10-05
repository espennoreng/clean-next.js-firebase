import { IUserRepository } from "@/src/application/repositories/user.repository.interface";
import { User } from "@/src/entities/models/user";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    return user;
  }

  async getUserById(id: User["id"]): Promise<User> {
    return {
      id,
      userName: "Geir Gustafsson",
    };
  }
}

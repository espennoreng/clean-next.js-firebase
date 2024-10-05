import { IUserRepository } from "@/src/application/repositories/user.repository.interface";
import { UserNotFoundError } from "@/src/entities/errors/user-not-found.error";
import { User } from "@/src/entities/models/user";
import { injectable } from "inversify";

@injectable()
export class UserRepositoryMock implements IUserRepository {
  private _users: User[] = [];

  async createUser(user: User) {
    this._users.push(user);
    return user;
  }

  async getUserById(id: User["id"]) {
    const user = this._users.find((user) => user.id === id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}

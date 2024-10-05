import { ContainerModule, interfaces } from "inversify";

import { DI_SYMBOLS } from "../types";
import { IUserRepository } from "@/src/application/repositories/user.repository.interface";
import { UserRepositoryMock } from "@/src/infrastructure/repositories/user.respository.mock";
import { UserRepository } from "@/src/infrastructure/repositories/user.respository";

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepositoryMock);
  } else {
    bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepository);
  }
};

export const UserModule = new ContainerModule(initializeModule);

import { IUserRepository } from "@/src/application/repositories/user.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  // Repositories
  IUserRepository: IUserRepository;
}

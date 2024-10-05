import { ContainerModule, interfaces } from "inversify";

import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

import { DI_SYMBOLS } from "../types";
import { AuthenticationServiceMock } from "@/src/infrastructure/services/authentication.service.mock";
import { AuthenticationService } from "@/src/infrastructure/services/authentication.service";

const initializeModule = (bind: interfaces.Bind) => {
  if (process.env.NODE_ENV === "test") {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(
      AuthenticationServiceMock
    );
  } else {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(
      AuthenticationService
    );
  }
};

export const AuthenticationModule = new ContainerModule(initializeModule);

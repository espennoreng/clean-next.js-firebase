import { Container } from "inversify";
import { AuthenticationModule } from "./modules/authentication.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { UserModule } from "./modules/users.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(AuthenticationModule);
  ApplicationContainer.load(UserModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(AuthenticationModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };

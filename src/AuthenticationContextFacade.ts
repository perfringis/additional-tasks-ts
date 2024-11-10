import { Authentication } from './Authentication';

export class AuthenticationContextFacade {
  public getAuthentication(): Authentication {
    return new Authentication();
  }
}

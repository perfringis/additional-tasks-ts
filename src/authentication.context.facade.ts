import { Authentication } from './authentication';
import { SecurityContextHolder } from './security.context.holder';

export interface AuthenticationFacade {
  getAuthentication(): Authentication;
}

export class AuthenticationContextFacade implements AuthenticationFacade {
  public getAuthentication(): Authentication {
    return SecurityContextHolder.getContext().getAuthentication();
  }
}

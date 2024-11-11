import { Authentication } from './authentication';

export class SecurityContext {
  public getAuthentication(): Authentication {
    throw new Error('Method not implemented.');
  }
}

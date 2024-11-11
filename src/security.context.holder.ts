import { SecurityContext } from './security.context';

export class SecurityContextHolder {
  static getContext(): SecurityContext {
    return new SecurityContext();
  }
}

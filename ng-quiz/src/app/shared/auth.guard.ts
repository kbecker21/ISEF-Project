import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
/**
 * Diese Komponente implementiert den AuthGuard. 
 * @Vorgang BI-002, BI-003
 */
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Prüft ob der Nutzer diese Route nutzen darf.
   * @param route ActivatedRouteSnapshot
   * @param router RouterStateSnapshot
   * @returns true: wenn Nutzer diese Route benutzen darf; false: wenn nicht
   * @Vorgang BI-002, BI-003
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {

        if (user == null)
          return this.router.createUrlTree(['/login']);


        const isAuth = !!user;
        const userRole = user.accountLevel;

        if (route.data.role && route.data.role != userRole) {
          return false;
        }

        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/login']);
      })
    );
  }
}

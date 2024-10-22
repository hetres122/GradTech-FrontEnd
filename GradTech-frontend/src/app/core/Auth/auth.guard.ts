import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {UserAuthService} from "@core/services";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private userAuthService = inject(UserAuthService);


  canActivate(): Observable<boolean> {
    return this.userAuthService.isAuthenticated();
  }
}

export const canActivate: CanActivateFn = (route, state) => {
  const authGuard = inject(AuthGuard);
  const router = inject(Router);

  return authGuard.canActivate().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(["auth"]).then(r => r);
      }
      return isAuthenticated;
    })
  );
};

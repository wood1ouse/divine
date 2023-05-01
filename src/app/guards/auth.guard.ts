import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth/auth.selectors';
import { ApiStatuses } from '@models/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(fromAuth.selectAuthState).pipe(
      filter((authState) => authState.status === ApiStatuses.LOADED),
      map((authState) => {
        if (authState.user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      take(1)
    );
  }
}

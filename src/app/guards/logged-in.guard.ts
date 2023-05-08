import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth/auth.selectors';
import { filter, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiStatuses } from '@models/store';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivateChild {
  constructor(private router: Router, private store: Store) {}

  canActivateChild(): Observable<boolean> {
    return this.store.select(fromAuth.selectAuthState).pipe(
      filter((authState) => authState.status === ApiStatuses.LOADED),

      map((authState) => {
        if (authState.user) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      }),
      take(1)
    );
  }
}

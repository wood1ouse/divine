import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth/auth.selectors';
import { filter, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiStatuses } from '@models/store';

@Injectable({
  providedIn: 'root',
})
export class DefaultGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectAuthState).pipe(
      filter((authState) => authState.status === ApiStatuses.LOADED),
      map((authState) => {
        if (authState.user) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      }),
      take(1)
    );
  }
}

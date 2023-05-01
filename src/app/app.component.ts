import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@facades/auth.facade';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'divine-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userEmail$: Observable<string | null>;

  user$: Observable<User | null>;

  title = 'divine';

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.dispatchInitAuthState();
    this.userEmail$ = this.authFacade.userEmail$;
    this.user$ = this.authFacade.user$;
  }
}

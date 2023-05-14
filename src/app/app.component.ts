import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@facades/auth.facade';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { TrelloFacade } from '@facades/trello.facade';

@Component({
  selector: 'divine-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userEmail$: Observable<string | null>;

  user$: Observable<User | null>;

  trelloUserName$: Observable<string | null>;

  title = 'divine';

  constructor(
    private authFacade: AuthFacade,
    private trelloFacade: TrelloFacade
  ) {}

  async ngOnInit(): Promise<void> {
    this.authFacade.dispatchInitAuthState();

    this.trelloFacade.dispatchCheckLinkWithTrello();
    this.trelloUserName$ = this.trelloFacade.trelloUserName$;

    this.userEmail$ = this.authFacade.userEmail$;
    this.user$ = this.authFacade.user$;
  }
}

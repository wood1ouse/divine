import { Component, Input } from '@angular/core';
import { AuthFacade } from '@facades/auth.facade';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'divine-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authFacade: AuthFacade) {}

  @Input() email: string | null;

  @Input() user: User | null;

  onLogout(): void {
    this.authFacade.dispatchLogout();
  }
}

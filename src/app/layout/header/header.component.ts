import { Component, Input, ViewChild } from '@angular/core';
import { AuthFacade } from '@facades/auth.facade';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'divine-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor(private authFacade: AuthFacade, private router: Router) {}

  @Input() trelloUserName: string | null;

  @Input() email: string | null;

  @Input() user: User | null;

  logout(): void {
    this.authFacade.dispatchLogout();
    this.popover.hide();
  }

  settings(): void {
    this.router.navigate(['/settings']);
    this.popover.hide();
  }
}

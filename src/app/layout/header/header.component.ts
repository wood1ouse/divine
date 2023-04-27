import { Component, Input } from '@angular/core';

@Component({
  selector: 'divine-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() email: string | null;
}

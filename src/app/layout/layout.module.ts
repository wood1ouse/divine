import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NbIconModule, NbPopoverModule, NbUserModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const COMPONENTS = [HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    NbUserModule,
    NbPopoverModule,
    NbIconModule,
    NbEvaIconsModule,
  ],
  exports: [...COMPONENTS],
})
export class LayoutModule {}

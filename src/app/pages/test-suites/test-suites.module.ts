import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestSuitesRoutingModule } from './test-suites-routing.module';
import { TestSuitesComponent } from './test-suites.component';

@NgModule({
  declarations: [TestSuitesComponent],
  imports: [CommonModule, TestSuitesRoutingModule],
})
export class TestSuitesModule {}

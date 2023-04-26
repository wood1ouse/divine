import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCasesRoutingModule } from './test-cases-routing.module';
import { TestCasesComponent } from './test-cases.component';

@NgModule({
  declarations: [TestCasesComponent],
  imports: [CommonModule, TestCasesRoutingModule],
})
export class TestCasesModule {}

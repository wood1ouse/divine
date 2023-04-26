import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCasesComponent } from './test-cases.component';
import { TestCaseDetailComponent } from '@pages/test-case-detail/test-case-detail.component';

const routes: Routes = [
  { path: '', component: TestCasesComponent },
  { path: ':id', component: TestCaseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestCasesRoutingModule {}

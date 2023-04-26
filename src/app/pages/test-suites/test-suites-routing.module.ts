import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestSuiteDetailComponent } from '@pages/test-suite-detail/test-suite-detail.component';
import { TestSuitesComponent } from './test-suites.component';

const routes: Routes = [
  { path: '', component: TestSuitesComponent },
  { path: ':id', component: TestSuiteDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestSuitesRoutingModule {}
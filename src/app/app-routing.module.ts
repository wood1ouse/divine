import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { ProjectDetailComponent } from '@pages/project-detail/project-detail.component';
import { TestSuitesComponent } from '@pages/test-suites/test-suites.component';
import { TestSuiteDetailComponent } from '@pages/test-suite-detail/test-suite-detail.component';
import { TestCasesComponent } from '@pages/test-cases/test-cases.component';
import { TestCaseDetailComponent } from '@pages/test-case-detail/test-case-detail.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { EmailConfirmComponent } from '@pages/email-confirm/email-confirm.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/./register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-confirm',
    component: EmailConfirmComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id/test-suites',
    component: TestSuitesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id/test-suites/:id',
    component: TestSuiteDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id/test-suites/:id/test-cases',
    component: TestCasesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id/test-suites/:id/test-cases/:id',
    component: TestCaseDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

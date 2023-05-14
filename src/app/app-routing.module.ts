import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from '@pages/projects/projects.component';
import { ProjectDetailComponent } from '@pages/project-detail/project-detail.component';
import { TestSuitesComponent } from '@pages/test-suites/test-suites.component';
import { TestSuiteDetailComponent } from '@pages/test-suite-detail/test-suite-detail.component';
import { TestCasesComponent } from '@pages/test-cases/test-cases.component';
import { TestCaseDetailComponent } from '@pages/test-case-detail/test-case-detail.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { ProjectCreateComponent } from '@pages/project-create/project-create.component';
import { EmailConfirmComponent } from '@pages/email-confirm/email-confirm.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

import { DefaultGuard } from './guards/default.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AuthGuard } from './guards/auth.guard';
import { ProjectAccessGuard } from './guards/project-access.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DefaultGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    canActivate: [DefaultGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/login',
      },
    ],
  },
  {
    path: 'auth',
    canActivateChild: [LoggedInGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-confirm',
    component: EmailConfirmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/create',
    component: ProjectCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectId',
    component: ProjectDetailComponent,
    canActivate: [AuthGuard, ProjectAccessGuard],
  },
  {
    path: 'projects/:projectId/test-suites',
    component: TestSuitesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectId/test-suites/:testSuiteId',
    component: TestSuiteDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectId/test-suites/:testSuiteId/test-cases',
    component: TestCasesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectId/test-suites/:testSuiteId/test-cases/:testCaseId',
    component: TestCaseDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

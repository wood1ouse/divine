import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/./projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'test-suites',
    loadChildren: () =>
      import('./pages/./test-suites/test-suites.module').then(
        (m) => m.TestSuitesModule
      ),
  },
  {
    path: 'test-cases',
    loadChildren: () =>
      import('./pages/./test-cases/test-cases.module').then((m) => m.TestCasesModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/./reports/reports.module').then((m) => m.ReportsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

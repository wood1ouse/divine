import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from '@pages/dashboard/dashboard.module';
import { LoginModule } from '@pages/login/login.module';
import { ProjectsModule } from '@pages/projects/projects.module';
import { RegisterModule } from '@pages/register/register.module';
import { ReportsModule } from '@pages/reports/reports.module';
import { TestCasesModule } from '@pages/test-cases/test-cases.module';
import { TestSuitesModule } from '@pages/test-suites/test-suites.module';
import { LayoutModule } from '@layout/layout.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';

const FEATURES = [
  DashboardModule,
  LoginModule,
  ProjectsModule,
  RegisterModule,
  ReportsModule,
  TestCasesModule,
  TestSuitesModule,
  TestSuitesModule,
  LayoutModule,
];

const STORE = [
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot(effects),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75,
  }),
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ...FEATURES, ...STORE],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

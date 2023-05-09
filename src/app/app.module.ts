import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from '@pages/login/login.module';
import { RegisterModule } from '@pages/register/register.module';
import { LayoutModule } from '@layout/layout.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';

import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ProjectDetailComponent } from '@pages/project-detail/project-detail.component';
import { TestSuitesComponent } from '@pages/test-suites/test-suites.component';
import { TestSuiteDetailComponent } from '@pages/test-suite-detail/test-suite-detail.component';
import { TestCasesComponent } from '@pages/test-cases/test-cases.component';
import { TestCaseDetailComponent } from '@pages/test-case-detail/test-case-detail.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { EmailConfirmComponent } from '@pages/email-confirm/email-confirm.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbStepperModule,
  NbThemeModule,
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCreateComponent } from '@pages/project-create/project-create.component';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  DashboardComponent,
  ProjectsComponent,
  ProjectDetailComponent,
  TestSuitesComponent,
  TestSuiteDetailComponent,
  TestCasesComponent,
  TestCaseDetailComponent,
];

const FEATURES = [LoginModule, RegisterModule, LayoutModule];

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
  declarations: [
    AppComponent,
    EmailConfirmComponent,
    ...COMPONENTS,
    ProjectCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    ...FEATURES,
    ...STORE,
    NbLayoutModule,
    NbButtonModule,
    NbStepperModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

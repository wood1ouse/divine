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
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbSelectWithAutocompleteModule,
  NbSidebarModule,
  NbStepperModule,
  NbTagModule,
  NbThemeModule,
  NbWindowModule,
} from '@nebular/theme';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProjectCreateComponent } from '@pages/project-create/project-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrelloInterceptor } from './api/trello.interceptor';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { TestCaseCreateComponent } from '@pages/test-case-create/test-case-create.component';
import { MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DeletePromptComponent } from '@pages/delete-prompt/delete-prompt.component';
import { StatisticsComponent } from '@pages/statistics/statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { SettingsComponent } from '@pages/settings/settings.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

const COMPONENTS = [
  DashboardComponent,
  ProjectsComponent,
  ProjectDetailComponent,
  TestSuitesComponent,
  TestSuiteDetailComponent,
  TestCasesComponent,
  TestCaseDetailComponent,
  DeletePromptComponent,
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
    TestCaseCreateComponent,
    DeletePromptComponent,
    StatisticsComponent,
    StatisticsComponent,
    SettingsComponent,
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
    NbTagModule,
    NbWindowModule.forRoot({}),
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    ReactiveFormsModule,
    AngularMarkdownEditorModule.forRoot({
      iconlibrary: 'fa',
    }),
    NbSelectWithAutocompleteModule,
    NbDialogModule.forRoot({}),
    NgxSkeletonLoaderModule,
    MatTableModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NgChartsModule,
    NbAccordionModule,
    NbPopoverModule,
    ClipboardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TrelloInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

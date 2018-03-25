import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ColorPickerModule} from 'ngx-color-picker';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from './interceptors/auth.interceptor';

import {AppComponent} from './app.component';
import {HeaderComponent} from './parts/header/header.component';
import {MenuComponent} from './parts/menu/menu.component';
import {TimetableComponent} from './parts/timetable/timetable.component';

import {CookieService} from 'angular2-cookie/core';

import * as Pages from './pages';
import * as Services from './service';
import * as Https from './http';

import 'rxjs/Rx';
import {FieldValidationSignComponent} from './parts/field-validation-sign/field-validation-sign.component';

const appRoutes: Routes = [
  { path: 'login', component: Pages.LoginPageComponent },

  { path: 'teachers', component: Pages.TeachersListPageComponent },
  { path: 'teachers/:id/information', component: Pages.TeacherInformationPageComponent },
  { path: 'teachers/:id/timetable', component: Pages.TeacherTimetablePageComponent },

  { path: 'students', component: Pages.StudentsListPageComponent },
  { path: 'students/:id', component: Pages.StudentInformationPageComponent },

  { path: 'cabinets', component: Pages.CabinetsListPageComponent },
  { path: 'cabinets/:id/information', component: Pages.CabinetInformationPageComponent },
  { path: 'cabinets/:id/timetable', component: Pages.CabinetTimetablePageComponent },

  { path: 'groups', component: Pages.GroupsListPageComponent },
  { path: 'groups/:id/information', component: Pages.GroupInformationPageComponent },
  { path: 'groups/:id/students', component: Pages.GroupStudentsPageComponent },
  { path: 'groups/:id/timetable', component: Pages.GroupTimetablePageComponent },

  { path: '**', component: Pages.TeachersListPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    MenuComponent,
    TimetableComponent,
    FieldValidationSignComponent,

    Pages.LoginPageComponent,

    Pages.TeacherInformationPageComponent,
    Pages.TeacherTimetablePageComponent,
    Pages.TeacherMenuPageComponent,
    Pages.TeachersListPageComponent,

    Pages.StudentInformationPageComponent,
    Pages.StudentsListPageComponent,

    Pages.CabinetInformationPageComponent,
    Pages.CabinetTimetablePageComponent,
    Pages.CabinetMenuPageComponent,
    Pages.CabinetsListPageComponent,

    Pages.GroupInformationPageComponent,
    Pages.GroupStudentsPageComponent,
    Pages.GroupTimetablePageComponent,
    Pages.GroupMenuPageComponent,
    Pages.AssignLessonPopupComponent,

    Pages.GroupsListPageComponent,
  ],
  imports: [
    TagInputModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    CookieService,

    Services.LoginService,
    Services.GroupsService,
    Services.StudentsService,
    Services.TeachersService,
    Services.CabinetsService,
    Services.LessonsService,

    Https.LoginHttp,
    Https.CabinetsHttp,
    Https.GroupsHttp,
    Https.StudentsHttp,
    Https.TeachersHttp
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

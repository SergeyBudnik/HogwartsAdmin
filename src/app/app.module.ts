import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ColorPickerModule} from 'ngx-color-picker';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from './interceptors/auth.interceptor';

import {AppComponent} from './app.component';
import {HeaderComponent} from './parts/header/header.component';
import {MenuComponent} from './parts/menu/menu.component';
import {TimetableComponent} from './parts/timetable/timetable.component';

import {CookieOptions, CookieService} from 'angular2-cookie/core';

import * as Pages from './pages';
import * as Services from './service';
import * as Https from './http';

import 'rxjs/Rx';
import {FieldValidationSignComponent} from './parts/field-validation-sign/field-validation-sign.component';
import {MyDatePickerModule} from 'mydatepicker';

import * as Controls from './controls';
import {StudentPaymentModal} from './parts/student/payment-modal/student-payment.modal';
import {ModalTemplateComponent} from './templates/modal/modal.template';
import {StudentPaymentRowComponent} from './pages/student/payment/payment-row/student-payment.row';
import {StudentAttendanceModal} from './parts/student/attendance-modal/student-attendance.modal';
import {StudentAttendanceRowComponent} from './pages/student/attendance/attendance-row/student-attendance.row';
import {ClipboardModule} from 'ngx-clipboard';
import {StudentStatusModal} from './parts/student/student-status-modal/student-status.modal';
import {StudentStatusComponent} from './parts/student/student-status/student-status.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ChartsModule} from 'ng2-charts';
import {GroupIconComponent} from './parts/group/group-icon/group-icon.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const appRoutes: Routes = [
  { path: 'login', component: Pages.LoginPageComponent },

  { path: 'teachers', component: Pages.TeachersListPageComponent },
  { path: 'teachers/:id/information', component: Pages.TeacherInformationPageComponent },
  { path: 'teachers/:id/timetable', component: Pages.TeacherTimetablePageComponent },

  { path: 'students', component: Pages.StudentsListPageComponent },
  { path: 'students/statistics', component: Pages.StudentsStatisticsPageComponent },
  { path: 'students/:id/information', component: Pages.StudentInformationPageComponent },
  { path: 'students/:id/status', component: Pages.StudentStatusPageComponent },
  { path: 'students/:id/attendance', component: Pages.StudentAttendancePageComponent },
  { path: 'students/:id/payment', component: Pages.StudentPaymentPageComponent },

  { path: 'cabinets', component: Pages.CabinetsListPageComponent },
  { path: 'cabinets/:id/information', component: Pages.CabinetInformationPageComponent },
  { path: 'cabinets/:id/timetable', component: Pages.CabinetTimetablePageComponent },

  { path: 'groups', component: Pages.GroupsListPageComponent },
  { path: 'groups/:id/information', component: Pages.GroupInformationPageComponent },
  { path: 'groups/:id/students', component: Pages.GroupStudentsPageComponent },
  { path: 'groups/:id/timetable', component: Pages.GroupTimetablePageComponent },

  { path: 'events', component: Pages.EventsListPageComponent },
  { path: 'events/:id/information', component: Pages.EventInformationPage },
  { path: 'events/:id/participants', component: Pages.EventParticipantsPage },
  { path: 'events/:eventId/participants/:participantId', component: Pages.ParticipantPageComponent },

  { path: 'economy', component: Pages.EconomyPage },

  { path: '**', component: Pages.StudentsListPageComponent }
];

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    Pages.StudentStatusPageComponent,
    Pages.StudentAttendancePageComponent,
    Pages.StudentPaymentPageComponent,
    Pages.StudentMenuPageComponent,
    Pages.StudentsListPageComponent,
    Pages.StudentsStatisticsPageComponent,

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

    Pages.EventsListPageComponent,
    Pages.EventInformationPage,
    Pages.EventParticipantsPage,
    Pages.EventMenuPageComponent,

    Pages.ParticipantPageComponent,

    Pages.EconomyPage,

    StudentPaymentRowComponent,
    StudentAttendanceRowComponent,

    StudentStatusComponent,

    StudentPaymentModal,
    StudentAttendanceModal,
    StudentStatusModal,

    GroupIconComponent,

    ModalTemplateComponent,

    Controls.SearchSelectControl,
    Controls.SearchTextInputControl,
    Controls.FormSelectControl,
    Controls.FormTagControl,
    Controls.FormTextControl,
    Controls.FormDateControl
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
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MyDatePickerModule,
    ReactiveFormsModule,
    ClipboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    CookieService,

    {
      provide: CookieOptions,
      useValue: {}
    },

    Services.LoginService,
    Services.StudentsService,
    Services.StudentPaymentService,
    Services.AppTranslationsService,

    Https.LoginHttp,
    Https.CabinetsHttp,
    Https.GroupsHttp,
    Https.StudentsHttp,
    Https.TeachersHttp,
    Https.StudentAttendanceHttp,
    Https.StudentPaymentHttp,
    Https.StudentStatusHttp,
    Https.EventsHttp,
    Https.EventParticipantsHttp
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

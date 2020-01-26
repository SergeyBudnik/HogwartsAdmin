import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {TimetableComponent} from './parts/timetable/timetable.component';

import {CookieOptions, CookieService} from 'angular2-cookie/core';

import * as Pages from './pages';
import * as Services from './service';
import * as Https from './http';
import * as Filters from './parts/filters';
import * as Controls from './controls';
import * as Parts from './parts';

import 'rxjs/Rx';
import {FieldValidationSignComponent} from './parts/field-validation-sign/field-validation-sign.component';
import {MyDatePickerModule} from 'mydatepicker';

import {StudentPaymentModal} from './parts/student/payment-modal/student-payment.modal';
import {ModalTemplateComponent} from './templates/modal/modal.template';
import {StudentAttendanceModal} from './parts/student/attendance-modal/student-attendance.modal';
import {ClipboardModule} from 'ngx-clipboard';
import {StudentStatusModal} from './parts/student/student-status-modal/student-status.modal';
import {StudentStatusComponent} from './parts/student/student-status/student-status.component';

import {ChartsModule} from 'ng2-charts';
import {GroupIconComponent} from './parts/group/group-icon/group-icon.component';
import {WeekSelectorComponent} from './parts/week-selector/week-selector.component';

const appRoutes: Routes = [
  { path: 'login', component: Pages.LoginPageComponent },

  { path: 'students', component: Pages.StudentsListPage },
  { path: 'students/:id/information', component: Pages.StudentCardInformationPage },
  { path: 'students/:id/status', component: Pages.StudentCardStatusPage },
  { path: 'students/:id/attendance', component: Pages.StudentCardAttendancePage },
  { path: 'students/:id/payment', component: Pages.StudentCardPaymentPage },

  { path: 'cabinets', component: Pages.CabinetsListPage },
  { path: 'cabinets/:id/information', component: Pages.CabinetInformationPage },
  { path: 'cabinets/:id/timetable', component: Pages.CabinetTimetablePage },

  { path: 'groups', component: Pages.GroupsListPage },
  { path: 'groups/:id/information', component: Pages.GroupCardInformationPage },
  { path: 'groups/:id/students', component: Pages.GroupCardStudentsPage },
  { path: 'groups/:id/timetable', component: Pages.GroupCardTimetablePage },

  { path: 'staff-members', component: Pages.StaffMembersListPageComponent },
  { path: 'staff-members/:login/information', component: Pages.StaffMemberCardInformationPageComponent },
  { path: 'staff-members/:login/timetable', component: Pages.StaffMemberCardTimetablePageComponent },

  { path: '**', component: Pages.StudentsListPage }
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    TimetableComponent,
    FieldValidationSignComponent,

    Pages.LoginPageComponent,

    Pages.StudentCardInformationPage,
    Pages.StudentCardStatusPage,
    Pages.StudentCardAttendancePage,
    Pages.StudentCardAttendanceRow,
    Pages.StudentCardPaymentPage,
    Pages.StudentCardPaymentRow,
    Pages.StudentMenuComponent,
    Pages.StudentCardInformationAssignGroupPopup,

    Pages.StudentsListPage,

    Pages.CabinetInformationPage,
    Pages.CabinetTimetablePage,
    Pages.CabinetCardMenuComponent,
    Pages.CabinetsListPage,

    Pages.GroupCardInformationPage, Pages.GroupCardInformationAssignLessonPopup,
    Pages.GroupCardStudentsPage,
    Pages.GroupCardTimetablePage,
    Pages.GroupMenuPageComponent,

    Pages.GroupsListPage,

    Pages.StaffMembersListPageComponent,
    Pages.StaffMemberCardInformationPageComponent,
    Pages.StaffMemberCardTimetablePageComponent,
    Pages.StaffMemberCardMenuComponent,

    StudentStatusComponent,

    StudentPaymentModal,
    StudentAttendanceModal,
    StudentStatusModal,

    GroupIconComponent,

    ModalTemplateComponent,

    Parts.MenuItemPartComponent,

    Controls.SearchSelectControl,
    Controls.SearchTextInputControl,

    Controls.FormSelectControl,
    Controls.FormSelectAgeControl,
    Controls.FormSelectCabinetControl,
    Controls.FormSelectEducationLevelControl,
    Controls.FormSelectGroupTypeControl,

    Controls.FormTagControl,
    Controls.FormTextControl,
    Controls.FormDateControl,

    Filters.AgeFilterComponent,
    Filters.CabinetsFilterComponent,
    Filters.EducationLevelFilterComponent,
    Filters.GroupTypeFilterComponent,

    WeekSelectorComponent
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
    ChartsModule,
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

    Services.NavigationService,
    Services.TranslationService,
    Services.LoginService,
    Services.StudentsService,
    Services.StudentPaymentService,
    Services.StudentGroupsService,
    Services.GroupService,

    Https.LoginHttp,
    Https.CabinetsHttp,
    Https.GroupsHttp,
    Https.StudentsHttp,
    Https.StudentAttendanceHttp,
    Https.StudentPaymentHttp,
    Https.StudentStatusHttp,
    Https.StaffMembersHttp
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

import 'rxjs/Rx';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ChartsModule} from 'ng2-charts';

import {TagInputModule} from 'ngx-chips';
import {ColorPickerModule} from 'ngx-color-picker';
import {ClipboardModule} from 'ngx-clipboard';

import {MyDatePickerModule} from 'mydatepicker';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from './interceptors/auth.interceptor';

import {AppComponent} from './app.component';

import {CookieOptions, CookieService} from 'angular2-cookie/core';

import * as Pages from './pages';
import * as Services from './service';
import * as Https from './http';
import * as Controls from './controls';
import * as Parts from './parts';

import {HeaderComponent} from './parts/header/header.component';
import {TimetableComponent} from './parts/timetable/timetable.component';
import {FieldValidationSignComponent} from './parts/field-validation-sign/field-validation-sign.component';
import {ModalTemplateComponent} from './templates/modal/modal.template';
import {StudentStatusComponent} from './parts/student/student-status/student-status.component';
import {GroupIconComponent} from './parts/group/group-icon/group-icon.component';
import {WeekSelectorComponent} from './parts/week-selector/week-selector.component';

const appRoutes: Routes = [
  { path: 'login', component: Pages.LoginPageComponent },

  { path: 'students', component: Pages.StudentsListPage },
  { path: 'students/new', component: Pages.StudentCardNewPage },
  { path: 'students/:login/information', component: Pages.StudentCardInformationPage },
  { path: 'students/:login/status', component: Pages.StudentCardStatusPage },
  { path: 'students/:login/attendance', component: Pages.StudentCardAttendancePage },
  { path: 'students/:login/payment', component: Pages.StudentCardPaymentPage },

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

  { path: 'new-students', component: Pages.NewStudentsListPage },
  { path: 'new-students/:new', component: Pages.NewStudentCardNewPage },
  { path: 'new-students/:login/information', component: Pages.NewStudentCardInformationPage },
  { path: 'new-students/:login/actions', component: Pages.NewStudentCardActionsPage },

  { path: '**', component: Pages.StudentsListPage }
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    TimetableComponent,
    FieldValidationSignComponent,

    Pages.LoginPageComponent,

    /**
     * Pages: Student
     */

    Pages.StudentCardNewPage,
    Pages.StudentCardInformationPage, Pages.StudentCardInformationGroupRowView, Pages.StudentCardInformationAssignGroupPopupView,
    Pages.StudentCardStatusPage, Pages.StudentCardStatusChangePopupView,
    Pages.StudentCardAttendancePage, Pages.StudentCardAttendanceRowView,
    Pages.StudentCardPaymentPage, Pages.StudentCardPaymentRowView, Pages.StudentCardPaymentAddPopupView,
    Pages.StudentMenuComponent,
    Pages.StudentsListPage,

    /**
     * Pages: Cabinet
     */

    Pages.CabinetInformationPage,
    Pages.CabinetTimetablePage,
    Pages.CabinetCardMenuComponent,
    Pages.CabinetsListPage,

    /**
     * Pages: Group
     */

    Pages.GroupCardInformationPage, Pages.GroupCardInformationAssignLessonPopupView, Pages.GroupCardInformationLessonRowView,
    Pages.GroupCardStudentsPage,
    Pages.GroupCardTimetablePage,
    Pages.GroupMenuPageComponent,
    Pages.GroupsListPage,

    /**
     * Pages: Staff Member
     */

    Pages.StaffMembersListPageComponent,
    Pages.StaffMemberCardInformationPageComponent,
    Pages.StaffMemberCardTimetablePageComponent,
    Pages.StaffMemberCardMenuComponent,

    /**
     * Pages: New student
     */

    Pages.NewStudentsListPage,
    Pages.NewStudentCardInformationPage,
    Pages.NewStudentCardActionsPage, Pages.NewStudentCardActionsUpdatePopup,
    Pages.NewStudentCardNewPage,
    Pages.NewStudentCardMenuComponent,

    /**
     * Parts
     */

    StudentStatusComponent,

    GroupIconComponent,

    ModalTemplateComponent,

    Parts.MenuItemPartComponent,
    Parts.PersonContactsView,

    /**
     * Controls
     */

    Controls.AppColorPickerControl,
    Controls.AppDateControl,
    Controls.AppSelectControl,
    Controls.AppTagControl,
    Controls.AppTextControl,

    Controls.AppFormInputControl,

    Controls.AppSelectAgeControl,
    Controls.AppSelectCabinetControl,
    Controls.AppSelectDayOfWeekControl,
    Controls.AppSelectEducationLevelControl,
    Controls.AppSelectGroupControl,
    Controls.AppSelectGroupTypeControl,
    Controls.AppSelectStaffMemberControl,
    Controls.AppSelectTimeControl,

    Controls.SearchSelectControl,

    Controls.FormSelectControl,

    Controls.FormTextControl,
    Controls.FormDateAndTimeControl,

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
    Https.StudentOnBoardingHttp,
    Https.StudentPaymentHttp,
    Https.StudentStatusHttp,
    Https.StaffMembersHttp
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

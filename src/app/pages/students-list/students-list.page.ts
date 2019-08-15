import {Component} from '@angular/core';
import {
  Group, Student, StudentGroup, StudentPayment, StudentPaymentStatus, StudentPaymentStatusUtils, StudentStatusType, StudentStatusTypeUtils,
  StudentUtils
} from '../../data';
import {Router} from '@angular/router';
import {AppTranslationsService, LoginService, StudentPaymentService} from '../../service';
import {SelectItem} from '../../controls/select-item';
import {GroupsHttp, StudentPaymentHttp, StudentsHttp} from '../../http';
import {CommonPage} from '../common/common.page';

@Component({
  selector: 'app-students-list-page',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.less']
})
export class StudentsListPageComponent extends CommonPage {
  private allStudents: Array<Student> = [];
  private allGroups: Array<Group> = [];
  private allPayments: Array<StudentPayment> = [];

  public students: Array<Student> = [];

  public loadingInProgress = true;

  private nameFilter: string = '';
  private statusFilter: StudentStatusType = null;
  private paymentFilter: StudentPaymentStatus = null;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private studentsHttp: StudentsHttp,
    private groupsHttp: GroupsHttp,
    private paymentHttp: StudentPaymentHttp,
    private studentPaymentService: StudentPaymentService,
    private appTranslationsService: AppTranslationsService
  ) {
    super();

    const thisService = this;

    this.doInit(router);
    this.doLogin(loginService.getAuthToken(), () => thisService.init());

    this.appTranslationsService.enableTranslations();
  }

  private init() {
    Promise.all([
      this.studentsHttp.getAllStudents(),
      this.groupsHttp.getAllGroups(),
      this.paymentHttp.getAllPayments()
    ]).then(it => {
      this.allStudents = it[0];
      this.allGroups = it[1];
      this.allPayments = it[2];

      this.students = this.getFilteredStudents();

      this.loadingInProgress = false;
    });
  }

  public getStudentsActiveGroups(student: Student): Array<StudentGroup> {
    const currentTime = new Date().getTime();

    return student
      .studentGroups
      .filter(studentGroup => studentGroup.startTime <= currentTime)
      .filter(studentGroup => !studentGroup.finishTime || currentTime <= studentGroup.finishTime);
  }

  public getGroup(groupId: number): Group {
    return this.allGroups.find(it => it.id === groupId);
  }

  public getPaymentItems(): Array<SelectItem> {
    return StudentPaymentStatusUtils.values.map(it => new SelectItem('-', it));
  }

  public getStatusItems(): Array<SelectItem> {
    return StudentStatusTypeUtils.values.map(it => new SelectItem('-', it));
  }

  public isStudentFilled(student: Student): boolean {
    return StudentUtils.isValid(student);
  }

  public onFilterChange(
    nameFilter: string,
    paymentFilter: StudentPaymentStatus,
    statusFilter: StudentStatusType,
  ) {
    this.nameFilter = nameFilter === undefined ? this.nameFilter : nameFilter;
    this.paymentFilter = paymentFilter === undefined ? this.paymentFilter : paymentFilter;
    this.statusFilter = statusFilter === undefined ? this.statusFilter : statusFilter;

    this.students = this.getFilteredStudents();
  }

  public getPayments(studentId: number): number {
    return this.studentPaymentService.getActualStudentMonthPayments(this.allPayments, studentId);
  }

  private getFilteredStudents(): Array<Student> {
    return this.allStudents
      .filter(it => {
        let nameMatches = it.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
        let phoneMatches = it.phones.filter(phone => phone.indexOf(this.nameFilter) != -1).length != 0;

        return nameMatches || phoneMatches;
      })
      .filter(it => !this.statusFilter || it.statusType === this.statusFilter)
      .filter(it =>
        !this.paymentFilter ||
        (this.paymentFilter === 'PAYED' && this.getPayments(it.id) !== 0) ||
        (this.paymentFilter === 'NOT_PAYED' && this.getPayments(it.id) === 0)
      )
      .sort((o1, o2) => o1.id - o2.id)
      .sort((o1, o2) => {
        if (o1.studentGroups.length == 0) {
          return -1;
        } else if (o2.studentGroups.length === 0) {
          return 1;
        } else {
          return o1.studentGroups[0].groupId - o2.studentGroups[0].groupId;
        }
      })
      .sort((o1, o2) => StudentStatusTypeUtils.compare(o1.statusType, o2.statusType));
  }
}

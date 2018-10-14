import {Component} from '@angular/core';
import {Group, Student, StudentPayment, StudentStatusType, StudentStatusTypeUtils, StudentUtils} from '../../data';
import {StudentsService} from '../../service';
import {Router} from '@angular/router';
import {TranslatableComponent} from '../../translation/translation.component';
import {Age, AgeUtils, EducationLevel, EducationLevelUtils} from '../../data';
import {LoginService} from '../../service';
import {SelectItem} from '../../controls/select-item';
import {GroupsHttp, StudentPaymentHttp} from '../../http';

@Component({
  selector: 'app-students-list-page',
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.less']
})
export class StudentsListPageComponent extends TranslatableComponent {
  private unfilteredStudents: Array<Student> = [];
  private allGroups: Array<Group> = [];
  private allPayments: Array<StudentPayment> = [];

  public students: Array<Student> = [];

  public loadingInProgress = true;

  private nameFilter: string = '';
  private educationLevelFilter: EducationLevel = 'UNKNOWN';
  private ageFilter: Age = 'UNKNOWN';
  private statusFilter: StudentStatusType = 'UNKNOWN';

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private studentsService: StudentsService,
    private groupsHttp: GroupsHttp,
    private paymentHttp: StudentPaymentHttp
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.studentsService.getAllStudents(),
        this.groupsHttp.getAllGroups(),
        this.paymentHttp.getAllPayments()
      ]).then(it => {
        this.unfilteredStudents = it[0];
        this.allGroups = it[1];
        this.allPayments = it[2];

        this.students = this.getFilteredStudents();

        this.loadingInProgress = false;
      });
    }
  }

  public getGroup(groupId: number): Group {
    return this.allGroups.find(it => it.id === groupId);
  }

  public openGroup(groupId: number) {
    this.router.navigate([`/groups/${groupId}/information`]);
  }

  public onNameFilterChange(nameFilter: string) {
    this.nameFilter = nameFilter;

    this.students = this.getFilteredStudents();
  }

  public getEducationLevelItems(): Array<SelectItem> {
    return EducationLevelUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все уровни' : this.getEducationLevelTranslation(it), it)
    );
  }

  public onEducationLevelFilterChange(educationLevelFilter: EducationLevel) {
    this.educationLevelFilter = educationLevelFilter;

    this.students = this.getFilteredStudents();
  }

  public getAgeItems(): Array<SelectItem> {
    return AgeUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все возрасты' : this.getAgeTranslationAsGroup(it), it)
    );
  }

  public onAgeFilterChange(ageFilter: Age) {
    this.ageFilter = ageFilter;

    this.students = this.getFilteredStudents();
  }

  public getStatusItems(): Array<SelectItem> {
    return StudentStatusTypeUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все статусы' : this.getStudentStatusTypeTranslation(it), it)
    );
  }

  public onStatusFilterChange(statusFilter: StudentStatusType): void {
    this.statusFilter = statusFilter;

    this.students = this.getFilteredStudents();
  }

  public openStudentPage(studentId: number) {
    this.router.navigate([`/students/${studentId}/information`]);
  }

  public openNewStudentPage() {
    this.router.navigate([`/students/new/information`]);
  }

  public isStudentFilled(student: Student): boolean {
    return StudentUtils.isValid(student);
  }

  public getPayments(studentId: number): number {
    let studentPayments = this.allPayments
      .filter(it => it.studentId === studentId)
      .filter(it => {
        let paymentDate = new Date(it.time);
        let currentDate = new Date();

        let sameYear = paymentDate.getFullYear() == currentDate.getFullYear();
        let sameMonth = paymentDate.getMonth() == currentDate.getMonth()

        return sameYear && sameMonth;
      });

    return studentPayments.length === 0 ? 0 : studentPayments
      .map(it => it.amount)
      .reduce((a1, a2) => a1 + a2);
  }

  private getFilteredStudents(): Array<Student> {
    return this.unfilteredStudents
      .filter(it => it.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1)
      .filter(it => this.educationLevelFilter === 'UNKNOWN' || it.educationLevel === this.educationLevelFilter)
      .filter(it => this.ageFilter === 'UNKNOWN' || it.age === this.ageFilter)
      .filter(it => this.statusFilter === 'UNKNOWN' || it.statusType === this.statusFilter)
      .sort((o1, o2) => o1.id - o2.id)
      .sort((o1, o2) => StudentStatusTypeUtils.compare(o1.statusType, o2.statusType));
  }
}

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService, NavigationService, TranslationService,} from '../../../../../service';
import {Group, StudentGroup, StaffMember, Student} from '../../../../../data';
import {GroupsHttp, StaffMembersHttp, StudentsHttp} from '../../../../../http';
import {GroupService} from '../../../../../service';
import {StudentGroupAndIndex} from './data/student-group-and-index';
import {StudentCardInformationAssignGroupPopupManager} from './views';

@Component({
  selector: 'app-student-card-information-page',
  templateUrl: './student-card-information.page.html',
  styleUrls: ['./student-card-information.page.less']
})
export class StudentCardInformationPage {
  public student: Student = Student.createNew();

  public loadingInProgress = true;

  public allStudents: Array<Student> = [];
  public allGroups: Array<Group> = [];
  public allStaffMembers: Array<StaffMember> = [];

  public constructor(
    private navigationService: NavigationService,
    private translationService: TranslationService,
    private groupsService: GroupService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private studentsHttp: StudentsHttp,
    private staffMembersHttp: StaffMembersHttp,
  ) {
    this.loginService.ifAuthenticated(() => {
      this.parseParams((studentLogin) => this.initStudent(studentLogin));
    });
  }

  public buildStudentGroupAndIndex(studentGroup: StudentGroup, studentGroupIndex: number): StudentGroupAndIndex {
    return new StudentGroupAndIndex(studentGroup, studentGroupIndex);
  }

  public addNewGroup(): void {
    StudentCardInformationAssignGroupPopupManager.pushStudentGroup(
      new StudentGroupAndIndex(
        new StudentGroup(null, new Date().getTime(), null),
        null
      ),
      (studentGroup: StudentGroup) => this.onGroupSaved(new StudentGroupAndIndex(studentGroup, null)),
      () => {}
    );
  }

  public goToStatus() {
    // this.navigationService.students().id(this.student.id).status().go();
  }

  public onGroupSaved(studentGroupAndIndex: StudentGroupAndIndex) {
    if (studentGroupAndIndex.index == null) {
      this.student.studentGroups.push(studentGroupAndIndex.group);
    } else {
      this.student.studentGroups[studentGroupAndIndex.index] = studentGroupAndIndex.group;
    }
  }

  public onGroupDeleted(studentGroupIndex: number) {
    let studentGroups: Array<StudentGroup> = [];

    for (let i = 0; i < this.student.studentGroups.length; i++) {
      if (i != studentGroupIndex) {
        studentGroups.push(this.student.studentGroups[i]);
      }
    }

    this.student.studentGroups = studentGroups;
  }

  public save(): void {
    this.loadingInProgress = true;

    this.studentsHttp.editStudent(this.student).then(() => {
      this.loadingInProgress = false;
    });
  }

  public delete(): void {
    this.loadingInProgress = true;

    // this.studentsHttp.deleteStudent(this.student.id).then(() => {
    //   this.navigationService.students().list().go();
    // });
  }

  public getMatchingGroups(): Array<Group> {
    return this.groupsService.getMatchingGroups(
      this.allGroups,
      this.student.educationInfo.age, this.student.educationInfo.level
    );
  }

  public hasAtLeastOneContact(): boolean {
    return this.student.person.contacts.phones.length !== 0 || !!this.student.person.contacts.vkLinks;
  }

  public goToVk() {
    // window.open(`https://vk.com/${this.student.vkLink}`, '_blank');
  }

  private initStudent(studentLogin: string): void {
    Promise.all([
      this.studentsHttp.getAllStudents(),
      this.groupsHttp.getAllGroups(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.allStudents = it[0];
      this.allGroups = it[1];
      this.allStaffMembers = it[2];

      this.student = this.allStudents.find(student => student.login === studentLogin);

      this.loadingInProgress = false;
    })
  }

  private parseParams(onStudent: (studentLogin: string) => any) {
    this.route.paramMap.subscribe(params => {
      const login = params.get('login');

      onStudent(login);
    });
  }
}

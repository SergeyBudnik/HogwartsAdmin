import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService, NavigationService, TranslationService,} from '../../../../../service';
import {Group, StudentGroup, Student, StaffMember, ExistingStudentOnBoarding} from '../../../../../data';
import {GroupsHttp, StaffMembersHttp, StudentOnBoardingHttp, StudentsHttp} from '../../../../../http';
import {GroupService} from '../../../../../service';

@Component({
  selector: 'app-student-card-new-page',
  templateUrl: './student-card-new.page.html',
  styleUrls: ['./student-card-new.page.less']
})
export class StudentCardNewPage {
  public student: Student = Student.createNew();

  public loadingInProgress = true;

  public allStaffMembers: Array<StaffMember> = [];

  private requestedGroupId: number;

  private allGroups: Array<Group> = [];

  public constructor(
    public navigationService: NavigationService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsService: GroupService,
    private groupsHttp: GroupsHttp,
    private studentsHttp: StudentsHttp,
    private staffMembersHttp: StaffMembersHttp,
    private studentOnBoardingHttp: StudentOnBoardingHttp
  ) {
    this.loadingInProgress = true;

    this.loginService.ifAuthenticated(() => {
      this.parseParams((groupId, studentOnBoardingLogin) => this.initStudent(groupId, studentOnBoardingLogin));
    });
  }

  public save(): void {
    this.loadingInProgress = true;

    this.studentsHttp.createStudent(this.student).then(() => {
      if (!!this.requestedGroupId) {
        this.navigationService.groups().id(this.requestedGroupId).students().go();
      } else {
        this.navigationService.students().login(this.student.login).information().go();
      }
    });
  }

  private initStudent(groupId: number, studentOnBoardingLogin: string): void {
    let studentOnBoardingLoginPromise: Promise<ExistingStudentOnBoarding>;

    if (!!studentOnBoardingLogin) {
      studentOnBoardingLoginPromise = this.studentOnBoardingHttp.getByLogin(studentOnBoardingLogin)
    } else {
      new Promise((resolve) => {
        resolve(null);
      }).then(() => {});
    }

    Promise.all([
      this.groupsHttp.getAllGroups(),
      this.staffMembersHttp.getAllStaffMembers(),
      studentOnBoardingLoginPromise
    ]).then(it => {
      this.allGroups = it[0];
      this.allStaffMembers = it[1];

      const studentOnBoarding = it[2] as ExistingStudentOnBoarding;

      this.student = Student.createNew();

      if (groupId != null) {
        const group = this.allGroups.find(g => g.id === groupId);

        this.student.educationInfo.age = group.age;
        this.student.educationInfo.level = group.educationLevel;
        this.student.studentGroups = [new StudentGroup(group.id, new Date().getTime(), null)];
      }

      if (studentOnBoarding != null) {
        this.student.login = studentOnBoarding.info.login;
        this.student.person = studentOnBoarding.info.person;
        this.student.educationInfo = studentOnBoarding.info.educationInfo;
      }

      this.loadingInProgress = false;
    });
  }

  private parseParams(onStudent: (groupId: number, studentOnBoardingLogin: string) => any) {
    this.route.queryParams.subscribe(queryParams => {
      const groupId = queryParams['groupId'];
      const studentOnBoardingLogin = queryParams['studentOnBoardingLogin'];

      if (!!groupId) {
        onStudent(Number(groupId), null);
      } else if (!!studentOnBoardingLogin) {
        onStudent(null, studentOnBoardingLogin);
      } else {
        onStudent(null, null);
      }
    });
  }
}

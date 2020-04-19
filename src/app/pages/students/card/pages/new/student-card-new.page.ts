import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService, NavigationService, TranslationService,} from '../../../../../service';
import {Group, StudentGroup, Student} from '../../../../../data';
import {GroupsHttp, StudentsHttp} from '../../../../../http';
import {GroupService} from '../../../../../service';

@Component({
  selector: 'app-student-card-new-page',
  templateUrl: './student-card-new.page.html',
  styleUrls: ['./student-card-new.page.less']
})
export class StudentCardNewPage {
  public student: Student = Student.createNew();

  public loadingInProgress = true;

  private requestedGroupId: number;

  private allGroups: Array<Group> = [];

  public constructor(
    private navigationService: NavigationService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsService: GroupService,
    private groupsHttp: GroupsHttp,
    private studentsHttp: StudentsHttp,
  ) {
    this.loadingInProgress = true;

    this.loginService.ifAuthenticated(() => {
      this.parseParams((groupId) => this.initStudent(groupId));
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

  private initStudent(groupId: number): void {
    Promise.all([
      this.groupsHttp.getAllGroups(),
    ]).then(it => {
      this.allGroups = it[0];

      this.student = Student.createNew();

      if (groupId != null) {
        let group = this.allGroups.find(group => group.id === groupId);

        this.student.educationInfo.age = group.age;
        this.student.educationInfo.level = group.educationLevel;
        this.student.studentGroups = [new StudentGroup(group.id, new Date().getTime(), null)];
      }

      this.loadingInProgress = false;
    })
  }

  private parseParams(onStudent: (groupId: number) => any) {
    this.route.queryParams.subscribe(queryParams => {
      const groupId = queryParams['groupId'];

      if (!!groupId) {
        onStudent(Number(groupId));
      } else {
        onStudent(null);
      }
    });
  }
}

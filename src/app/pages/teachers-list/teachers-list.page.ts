import {Component} from '@angular/core';
import {GroupService, LoginService} from '../../service';
import {Group, Teacher, TimeUtils} from '../../data';
import {Router} from '@angular/router';
import {GroupsHttp, StudentsHttp, TeachersHttp} from '../../http';

@Component({
  selector: 'app-teachers-list-page',
  templateUrl: './teachers-list.page.html',
  styleUrls: ['./teachers-list.page.less']
})
export class TeachersListPageComponent {
  public teachers: Array<Teacher> = [];
  public loadingInProgress = true;

  private allTeachers: Array<Teacher> = [];
  private activeGroups: Array<Group> = [];

  public constructor(
    private loginService: LoginService,
    private router: Router,
    private studentsHttp: StudentsHttp,
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp,
    private groupService: GroupService
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.teachersHttp.getAllTeachers(),
        this.groupsHttp.getAllGroups(),
        this.studentsHttp.getAllStudents()
      ]).then(it => {
        const currentTime = new Date().getTime();

        const allTeachers = it[0];
        const allGroups = it[1];
        const allStudents= it[2];

        this.activeGroups = allGroups.filter(group => this.groupService.isGroupActive(group, allStudents, currentTime));

        this.allTeachers = allTeachers;

        this.teachers = this.getFilteredTeachers('');

        this.loadingInProgress = false;
      });
    }
  }

  public getGroups(teacherId: number): Array<Group> {
    return []; // this.activeGroups.filter(it => it.managerId === teacherId);
  }

  public onSearchChange(teacherNameFilter: string) {
    this.teachers = this.getFilteredTeachers(teacherNameFilter);
  }

  public openTeacherPage(teacherId: number): void {
    this.router.navigate([`/teachers/${teacherId}/information`]).then();
  }

  public openNewTeacherPage(): void {
    this.router.navigate([`/teachers/new/information`]).then();
  }

  public getLoadMinutes(teacherId: number): number {
    return 0;

    // const currentTime = new Date().getTime();
    //
    // let minutes = 0;
    //
    // this.activeGroups.forEach(group =>
    //   this.groupService
    //     .getGroupActiveLessons(group, currentTime)
    //     .filter(lesson => lesson.teacherId === teacherId)
    //     .forEach(lesson => {
    //       minutes += 30 * (TimeUtils.index(lesson.finishTime) - TimeUtils.index(lesson.startTime))
    //     })
    // );
    //
    // return minutes;
  }

  private getFilteredTeachers(teacherNameFilter: string): Array<Teacher> {
    return this.allTeachers
      .filter(it => it.name.toLowerCase().indexOf(teacherNameFilter.toLowerCase()) !== -1)
      .sort((t1, t2) => this.getLoadMinutes(t2.id) - this.getLoadMinutes(t1.id));
  }
}

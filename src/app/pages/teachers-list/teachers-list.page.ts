import {Component} from '@angular/core';
import {LoginService} from '../../service';
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

  private unfilteredTeachers: Array<Teacher> = [];
  private groups: Array<Group> = [];

  public constructor(
    private loginService: LoginService,
    private router: Router,
    private studentsHttp: StudentsHttp,
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp,
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.teachersHttp.getAllTeachers(),
        this.groupsHttp.getAllGroups()
      ]).then(it => {
        this.unfilteredTeachers = it[0];
        this.groups = it[1];

        this.teachers = this.getFilteredTeachers('');

        this.loadingInProgress = false;
      });
    }
  }

  public getGroups(teacherId: number): Array<Group> {
    return this.groups.filter(it => it.managerId === teacherId);
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
    let minutes = 0;

    this.groups.forEach(group =>
      group.lessons
        .filter(lesson => lesson.teacherId === teacherId)
        .forEach(lesson => {
          minutes += 30 * (TimeUtils.index(lesson.finishTime) - TimeUtils.index(lesson.startTime))
        })
    );

    return minutes;
  }

  private getFilteredTeachers(teacherNameFilter: string): Array<Teacher> {
    return this.unfilteredTeachers
      .filter(it => it.name.toLowerCase().indexOf(teacherNameFilter.toLowerCase()) !== -1)
      .sort((t1, t2) => this.getLoadMinutes(t2.id) - this.getLoadMinutes(t1.id));
  }
}

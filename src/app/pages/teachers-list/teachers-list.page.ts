import {Component} from '@angular/core';
import {GroupsService, LoginService, TeachersService} from '../../service';
import {Group, Teacher, TimeUtils} from '../../data';
import {Router} from '@angular/router';

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
    private teachersService: TeachersService,
    private groupsService: GroupsService
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.teachersService.getAllTeachers(),
        this.groupsService.getAllGroups()
      ]).then(it => {
        this.unfilteredTeachers = it[0];
        this.groups = it[1];

        this.teachers = this.getFilteredTeachers('');

        this.loadingInProgress = false;
      });
    }
  }

  public onSearchChange(teacherNameFilter: string) {
    this.teachers = this.getFilteredTeachers(teacherNameFilter);
  }

  public openTeacherPage(teacherId: number): void {
    this.router.navigate([`/teachers/${teacherId}/information`]);
  }

  public openNewTeacherPage(): void {
    this.router.navigate([`/teachers/new/information`]);
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

  public getWeeklyPayment(teacherId: number): number {
    let payment = 0;

    this.groups.forEach(group =>
      group.lessons
        .filter(lesson => lesson.teacherId === teacherId)
        .forEach(lesson => {
          let difference = TimeUtils.index(lesson.finishTime) - TimeUtils.index(lesson.startTime);

          if (difference == 1) {
            payment += 500;
          } else if (difference == 2) {
            payment += 700;
          } else {
            payment += 250 * difference;
          }
        })
    );

    return payment;
  }
  
  private getFilteredTeachers(teacherNameFilter: string): Array<Teacher> {
    return this.unfilteredTeachers
      .filter(it => it.name.toLowerCase().indexOf(teacherNameFilter.toLowerCase()) !== -1);
  }
}

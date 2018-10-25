import {Component} from '@angular/core';
import {LoginService, StudentPaymentService} from '../../service';
import {Group, Student, Teacher, TimeUtils} from '../../data';
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
  private students: Array<Student> = [];

  public constructor(
    private loginService: LoginService,
    private router: Router,
    private studentsHttp: StudentsHttp,
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp,
    private studentPaymentService: StudentPaymentService
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.teachersHttp.getAllTeachers(),
        this.groupsHttp.getAllGroups(),
        this.studentsHttp.getAllStudents()
      ]).then(it => {
        this.unfilteredTeachers = it[0];
        this.groups = it[1];
        this.students = it[2];

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

  public getWeeklySalary(teacherId: number): number {
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

  public getWeeklyIncome(teacherId: number): number {
    let income = 0;

    this.groups.forEach(group => {
      const students = this.students
        .filter(it => it.statusType === 'STUDYING')
        .filter(it => it.groupIds.indexOf(group.id) !== -1);

      const lessons = group.lessons.filter(it => it.teacherId === teacherId);

      income += this.studentPaymentService.getGroupPayment(group, lessons, students);
    });

    return income;
  }

  private getFilteredTeachers(teacherNameFilter: string): Array<Teacher> {
    return this.unfilteredTeachers
      .filter(it => it.name.toLowerCase().indexOf(teacherNameFilter.toLowerCase()) !== -1);
  }
}

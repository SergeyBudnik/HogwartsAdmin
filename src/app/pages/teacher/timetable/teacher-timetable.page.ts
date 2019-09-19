import {TranslatableComponent} from '../../../translation/translation.component';
import {Component} from '@angular/core';
import {GroupService, LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group, Lesson, Teacher} from '../../../data';
import {GroupsHttp, TeachersHttp} from '../../../http';
import {endOfWeek, startOfWeek} from 'date-fns';

@Component({
  selector: 'app-teacher-timetable-page',
  templateUrl: './teacher-timetable.page.html',
  styleUrls: ['./teacher-timetable.page.less']
})
export class TeacherTimetablePageComponent extends TranslatableComponent {
  public teacher: Teacher = new Teacher();
  public teacherGroups: Array<Group> = [];
  public teacherLessons: Array<Lesson> = [];

  private allGroups = [];

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp,
    private groupService: GroupService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.teacher.id = Number(params.get('id'));

        this.load(this.teacher.id);
      });
    }
  }

  public onWeekChanged(currentWeek: number) {
    const time = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 * currentWeek);

    this.initTimetable(time);
  }

  private load(teacherId: number) {
    Promise.all([
      this.teachersHttp.getTeacher(teacherId),
      this.groupsHttp.getAllGroups()
    ]).then(it => {
      this.teacher = it[0];
      this.allGroups = it[1];

      this.initTimetable(new Date());

      this.loadingInProgress = false;
    });
  }

  private initTimetable(time: Date): void {
    const options = {weekStartsOn: 1};

    const weekStartTime = startOfWeek(time, options).getTime() + 9 * 60 * 60 * 1000;
    const weekEndTime = endOfWeek(time, options).getTime() + 9 * 60 * 60 * 1000;

    const teacherGroups: Array<Group> = [];
    const teacherLessons: Array<Lesson> = [];

    this.allGroups.forEach(group => {
      teacherGroups.push(group);

      group
        .lessons
        .filter(lesson => lesson.creationTime <= weekStartTime)
        .filter(lesson => !lesson.deactivationTime || weekEndTime <= lesson.deactivationTime)
        .filter(it => it.teacherId === this.teacher.id)
        .forEach(lesson => teacherLessons.push(lesson));
    });

    this.teacherGroups = teacherGroups;
    this.teacherLessons = teacherLessons;
  }
}

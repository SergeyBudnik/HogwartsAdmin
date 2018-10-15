import {Component} from '@angular/core';
import {LoginService} from '../../../service';
import {Lesson, Teacher, TeacherTypeUtils, Group, DayOfWeekUtils, TimeUtils, DayOfWeek, Time, TeacherAvailability} from '../../../data';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatableComponent} from '../../../translation/translation.component';
import {GroupsHttp, TeachersHttp} from '../../../http';

@Component({
  selector: 'app-teacher-information-page',
  templateUrl: './teacher-information.page.html',
  styleUrls: ['./teacher-information.page.less']
})
export class TeacherInformationPageComponent extends TranslatableComponent {
  public teacherTypes = TeacherTypeUtils.values;

  public teacher: Teacher = new Teacher();

  public groups: Array<Group> = [];
  public lessons: Array<Lesson> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

  public daysOfWeek = DayOfWeekUtils.values;
  public lessonTimes = TimeUtils.values;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id === 'new') {
          this.loadingInProgress = false;
        } else {
          this.initTeacher(Number(id));
        }
      });
    }
  }

  public save(): void {
    this.actionInProgress = true;

    if (!this.teacher.id) {
      this.teachersHttp.createTeacher(this.teacher).then(it => {
        this.actionInProgress = false;
        this.router.navigate([`/teachers/${it}`]);
      });
    } else {
      this.teachersHttp.editTeacher(this.teacher).then(
        () => this.actionInProgress = false
      );
    }
  }

  public delete(): void {
    this.actionInProgress = true;

    this.teachersHttp.deleteTeacher(this.teacher.id).then(() => {
      this.actionInProgress = false;
      this.router.navigate([`/teachers`]);
    });
  }

  public isAvailable(dayOfWeek: DayOfWeek, time: Time) {
    return this.teacher.availability
      .filter(it => it.dayOfWeek === dayOfWeek)
      .filter(it => it.time === time)
      .length !== 0;
  }

  public toggleAvailability(dayOfWeek: DayOfWeek, time: Time) {
    let isAvailable = this.isAvailable(dayOfWeek, time);

    if (isAvailable) {
      this.teacher.availability = this.teacher.availability.filter(it => it.dayOfWeek !== dayOfWeek || it.time !== time)
    } else {
      this.teacher.availability.push(new TeacherAvailability(dayOfWeek, time));
    }
  }

  private initTeacher(teacherId: number): void {
    this.teacher.id = teacherId;

    Promise.all([
      this.teachersHttp.getTeacher(teacherId),
      this.groupsHttp.getAllGroups()
    ]).then(it => {
      this.teacher = it[0];
      this.groups = it[1];

      this.loadingInProgress = false;
    });
  }
}

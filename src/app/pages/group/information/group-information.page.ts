import {Component} from '@angular/core';
import {TeachersService, GroupsService, StudentsService, LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Group, Student, EducationLevelUtils, AgeUtils, DayOfWeek, DayOfWeekUtils, Lesson, Teacher, Cabinet, TimeUtils,
  Time, GroupTypeUtils
} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp} from '../../../http';

@Component({
  selector: 'app-group-information-page',
  templateUrl: './group-information.page.html',
  styleUrls: ['./group-information.page.less']
})
export class GroupInformationPageComponent extends TranslatableComponent {
  public daysOfWeek: Array<DayOfWeek> = DayOfWeekUtils.values;

  public educationLevels = EducationLevelUtils.values;
  public ages = AgeUtils.values;
  public groupTypes = GroupTypeUtils.values;

  public group: Group = new Group();
  public students: Array<Student> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

  private teachers: Array<Teacher> = [];
  private cabinets: Array<Cabinet> = [];

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private teachersService: TeachersService,
    private groupsService: GroupsService,
    private studentsService: StudentsService,
    private cabinetsHttp: CabinetsHttp
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');


        if (id === 'new') {
          this.initNewGroup();
        } else {
          this.group.id = Number(id);
          this.initGroup(Number(id));
        }
      });
    }
  }

  public save(): void {
    this.group.cabinetId = Number(this.group.cabinetId);

    this.actionInProgress = true;

    if (!!this.group.id) {
      this.groupsService
        .editGroup(this.group)
        .then(() => this.actionInProgress = false);
    } else {
      this.groupsService
        .createGroup(this.group)
        .then(it => {
          this.actionInProgress = false;
          this.router.navigate([`/groups/${it}/information`]);
        });
    }
  }

  public delete(): void {
    this.groupsService.deleteGroup(this.group.id).then(() => {
      this.actionInProgress = false;
      this.router.navigate([`/groups`]);
    });
  }

  public removeLesson(dayOfWeek: DayOfWeek, startTime: Time) {
    const lessons = [];

    this.group.lessons
      .filter(it => it.day !== dayOfWeek || it.startTime !== startTime)
      .forEach(it => lessons.push(it));

    this.group.lessons = lessons;
  }

  public getDayLessons(day: DayOfWeek): Array<Lesson> {
    return this.group.lessons
      .filter(it => it.day === day)
      .sort((o1, o2) => TimeUtils.earlier(o1.startTime, o2.startTime) ? -1 : 1);
  }

  public getTeachers(): Array<Teacher> {
    return this.teachers;
  }

  public getTeacher(teacherId: number): Teacher {
    return this.teachers.find(it => it.id === teacherId);
  }

  private initGroup(groupId: number) {
    Promise.all([
      this.groupsService.getGroup(groupId),
      this.studentsService.getGroupStudents(groupId),
      this.teachersService.getAllTeachers(),
      this.cabinetsHttp.getAllCabinets()
    ]).then(it => {
      this.group = it[0];
      this.students = it[1];
      this.teachers = it[2];
      this.cabinets = it[3];

      this.loadingInProgress = false;
    });
  }

  private initNewGroup() {
    Promise.all([
      this.teachersService.getAllTeachers(),
      this.cabinetsHttp.getAllCabinets()
    ]).then(it => {
      this.teachers = it[0];
      this.cabinets = it[1];

      this.loadingInProgress = false;
    });
  }
}

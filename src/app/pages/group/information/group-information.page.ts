import {Component} from '@angular/core';
import {StudentsService, LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Group, Student, EducationLevelUtils, AgeUtils, DayOfWeek, DayOfWeekUtils, Lesson, Teacher, Cabinet, TimeUtils,
  Time, GroupTypeUtils
} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp, GroupsHttp, TeachersHttp} from '../../../http';
import {SelectItem} from '../../../controls/select-item';

@Component({
  selector: 'app-group-information-page',
  templateUrl: './group-information.page.html',
  styleUrls: ['./group-information.page.less']
})
export class GroupInformationPageComponent extends TranslatableComponent {
  public daysOfWeek: Array<DayOfWeek> = DayOfWeekUtils.values;

  public educationLevels = EducationLevelUtils.values.map(it => new SelectItem(this.getEducationLevelTranslation(it), it));
  public ages = AgeUtils.values.map(it => new SelectItem(this.getAgeTranslationAsGroup(it), it));
  public groupTypes = GroupTypeUtils.values.map(it => new SelectItem(this.getGroupTypeTranslation(it), it));

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
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp,
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
      this.groupsHttp
        .editGroup(this.group)
        .then(() => this.actionInProgress = false);
    } else {
      this.groupsHttp
        .createGroup(this.group)
        .then(it => {
          this.actionInProgress = false;
          this.router.navigate([`/groups/${it}/information`]);
        });
    }
  }

  public delete(): void {
    this.groupsHttp.deleteGroup(this.group.id).then(() => {
      this.actionInProgress = false;
      this.router.navigate([`/groups`]);
    });
  }

  public deleteLesson(dayOfWeek: DayOfWeek, startTime: Time) {
    let lessons = [];

    this.group.lessons
      .filter(it => !!it.id)
      .filter(it => it.day !== dayOfWeek || it.startTime !== startTime)
      .forEach(it => lessons.push(it));

    this.group.lessons = lessons;
  }

  public deactivateLesson(id: number) {
    this.group.lessons
      .filter(it => it.id === id)
      .forEach(it => it.deactivationTime = new Date().getTime());
  }

  public activateLesson(id: number) {
    this.group.lessons
      .filter(it => it.id === id)
      .forEach(it => it.deactivationTime = null);
  }

  public getDayLessons(day: DayOfWeek): Array<Lesson> {
    return this.group.lessons
      .filter(it => it.day === day)
      .sort((o1, o2) => TimeUtils.earlier(o1.startTime, o2.startTime) ? -1 : 1);
  }

  public getTeacher(teacherId: number): Teacher {
    return this.teachers.find(it => it.id === teacherId);
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.teachers.map(it => new SelectItem(it.name, "" + it.id));
  }

  public getCabinetsItems(): Array<SelectItem> {
    return this.cabinets.map(it => new SelectItem(it.name, "" + it.id));
  }

  private initGroup(groupId: number) {
    Promise.all([
      this.groupsHttp.getGroup(groupId),
      this.studentsService.getGroupStudents(groupId),
      this.teachersHttp.getAllTeachers(),
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
      this.teachersHttp.getAllTeachers(),
      this.cabinetsHttp.getAllCabinets()
    ]).then(it => {
      this.teachers = it[0];
      this.cabinets = it[1];

      this.loadingInProgress = false;
    });
  }
}

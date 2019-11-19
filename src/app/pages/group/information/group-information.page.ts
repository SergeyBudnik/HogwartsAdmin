import {Component} from '@angular/core';
import {StudentsService, LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group, Student, Lesson, Teacher, Cabinet, GroupTypeUtils} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp, GroupsHttp, TeachersHttp} from '../../../http';
import {SelectItem} from '../../../controls/select-item';
import {GroupAssignLessonPopupManager} from '../../';

@Component({
  selector: 'app-group-information-page',
  templateUrl: './group-information.page.html',
  styleUrls: ['./group-information.page.less']
})
export class GroupInformationPageComponent extends TranslatableComponent {
  public showInactiveLessons = false;

  public groupTypes = GroupTypeUtils.values.map(it => new SelectItem(this.getGroupTypeTranslation(it), it));

  public group: Group = new Group();
  public lessons: Array<Lesson> = [];
  public students: Array<Student> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

  public teachers: Array<Teacher> = [];
  public cabinets: Array<Cabinet> = [];

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
          this.initGroup(Number(id));
        }
      });
    }
  }

  public save(): void {
    this.actionInProgress = true;

    if (!!this.group.id) {
      this.groupsHttp
        .editGroup(this.group)
        .then(() => this.router.navigate([`/groups/${this.group.id}/information`]));
    } else {
      this.groupsHttp
        .createGroup(this.group)
        .then(it => this.router.navigate([`/groups/${it}/information`]));
    }
  }

  public delete(): void {
    this.groupsHttp.deleteGroup(this.group.id).then(() => {
      this.actionInProgress = false;
      this.router.navigate([`/groups`]);
    });
  }

  public getTeacher(teacherId: number): Teacher {
    return this.teachers.find(it => it.id === teacherId);
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.teachers.map(it => new SelectItem(it.name, "" + it.id));
  }

  public toggleInactiveLessons() {
    this.showInactiveLessons = !this.showInactiveLessons;

    this.lessons = this.getGroupLessons();
  }

  public setExistingModalLesson(lesson: Lesson, index: number) {
    GroupAssignLessonPopupManager.pushGroupLesson(
      lesson,
      index,
      (lesson: Lesson) => this.onLessonSaved(lesson, index),
      () => this.onLessonDeleted(index)
    );
  }

  public setNewModalLesson() {
    GroupAssignLessonPopupManager.pushGroupLesson(
      new Lesson(),
      null,
      (lesson: Lesson) => this.onLessonSaved(lesson, null),
      () => {}
    );
  }

  public onLessonSaved(lesson: Lesson, lessonIndex: number) {
    if (lessonIndex == null) {
      this.group.lessons.push(lesson);
    } else {
      this.group.lessons[lessonIndex] = lesson;
    }
  }

  private onLessonDeleted(lessonIndex: number) {
    let lessons: Array<Lesson> = [];

    for (let i = 0; i < this.group.lessons.length; i++) {
      if (i != lessonIndex) {
        lessons.push(this.group.lessons[i]);
      }
    }

    this.group.lessons = lessons;
  }

  private initGroup(groupId: number) {
    this.group.id = groupId;

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

      this.lessons = this.getGroupLessons();

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

  private getGroupLessons(): Array<Lesson> {
    const currentTime = new Date().getTime();

    return this.group.lessons
      .filter(lesson => {
        if (this.showInactiveLessons) {
          return true;
        } else {
          const creationTimeMatches = lesson.creationTime <= currentTime;
          const deactivationTimeMatches = !lesson.deactivationTime || currentTime <= lesson.deactivationTime;

          return creationTimeMatches && deactivationTimeMatches;
        }
      });
  }
}

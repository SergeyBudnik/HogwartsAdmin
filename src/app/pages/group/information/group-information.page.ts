import {Component} from '@angular/core';
import {StudentsService, LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Group, Student, AgeUtils, Lesson, Teacher, Cabinet, GroupTypeUtils, EducationLevelDictionary, StudentGroup
} from '../../../data';
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
  public ages = AgeUtils.values.map(it => new SelectItem(this.getAgeTranslationAsGroup(it), it));
  public groupTypes = GroupTypeUtils.values.map(it => new SelectItem(this.getGroupTypeTranslation(it), it));

  public group: Group = new Group();
  public students: Array<Student> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

  public teachers: Array<Teacher> = [];
  public cabinets: Array<Cabinet> = [];

  public educationLevelDictionary = new EducationLevelDictionary();

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

  public getTeacher(teacherId: number): Teacher {
    return this.teachers.find(it => it.id === teacherId);
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.teachers.map(it => new SelectItem(it.name, "" + it.id));
  }

  public getCabinetsItems(): Array<SelectItem> {
    return this.cabinets.map(it => new SelectItem(it.name, "" + it.id));
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

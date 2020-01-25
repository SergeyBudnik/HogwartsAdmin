import {Component} from '@angular/core';
import {StudentsService, LoginService, NavigationService} from '../../../service';
import {ActivatedRoute} from '@angular/router';
import {Group, Student, Lesson, Teacher, Cabinet, StaffMember} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp, GroupsHttp, StaffMembersHttp, TeachersHttp} from '../../../http';
import {SelectItem} from '../../../controls/select-item';
import {GroupAssignLessonPopupManager} from '../../';

@Component({
  selector: 'app-group-information-page',
  templateUrl: './group-information.page.html',
  styleUrls: ['./group-information.page.less']
})
export class GroupInformationPageComponent extends TranslatableComponent {
  public showInactiveLessons = false;

  public group: Group = new Group();
  public lessons: Array<Lesson> = [];
  public students: Array<Student> = [];

  public loadingInProgress = true;

  public teachers: Array<Teacher> = [];
  public staffMembers: Array<StaffMember> = [];
  public cabinets: Array<Cabinet> = [];

  public constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private teachersHttp: TeachersHttp,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
    private cabinetsHttp: CabinetsHttp,
    private staffMembersHttp: StaffMembersHttp
  ) {
    super();

    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id === 'new') {
          this.initNewGroup();
        } else {
          this.initGroup(Number(id));
        }
      });
    });
  }

  public save(): void {
    this.loadingInProgress = true;

    if (!!this.group.id) {
      this.groupsHttp
        .editGroup(this.group)
        .then(() => this.loadingInProgress = false);
    } else {
      this.groupsHttp
        .createGroup(this.group)
        .then(it => this.navigationService.groups().id(it).information());
    }
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.groupsHttp.deleteGroup(this.group.id).then(() => {
      this.navigationService.groups().list().go();
    });
  }

  public getTeacher(teacherLogin: string): Teacher {
    return this.teachers.find(it => it.login === teacherLogin);
  }

  public getStaffMembersItems(): Array<SelectItem> {
    return this.staffMembers.map(it => new SelectItem(it.person.name, it.login));
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

    this.lessons = this.getGroupLessons();
  }

  private onLessonDeleted(lessonIndex: number) {
    let lessons: Array<Lesson> = [];

    for (let i = 0; i < this.group.lessons.length; i++) {
      if (i != lessonIndex) {
        lessons.push(this.group.lessons[i]);
      }
    }

    this.group.lessons = lessons;

    this.lessons = this.getGroupLessons();
  }

  private initGroup(groupId: number) {
    this.group.id = groupId;

    Promise.all([
      this.groupsHttp.getGroup(groupId),
      this.studentsService.getGroupStudents(groupId),
      this.teachersHttp.getAllTeachers(),
      this.cabinetsHttp.getAllCabinets(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.group = it[0];
      this.students = it[1];
      this.teachers = it[2];
      this.cabinets = it[3];
      this.staffMembers = it[4];

      this.lessons = this.getGroupLessons();

      this.loadingInProgress = false;
    });
  }

  private initNewGroup() {
    Promise.all([
      this.teachersHttp.getAllTeachers(),
      this.cabinetsHttp.getAllCabinets(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.group = new Group();
      this.students = [];
      this.teachers = it[0];
      this.cabinets = it[1];
      this.staffMembers = it[2];

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

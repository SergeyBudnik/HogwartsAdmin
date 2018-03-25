import {Component} from '@angular/core';
import {LessonsService, LoginService, TeachersService, GroupsService} from '../../../service';
import {Lesson, Teacher, TeacherTypeUtils, Group} from '../../../data';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatableComponent} from '../../../translation/translation.component';

@Component({
  selector: 'app-teacher-information-page',
  templateUrl: './teacher-information.page.html',
  styleUrls: ['./teacher-information.page.less']
})
export class TeacherInformationPageComponent extends TranslatableComponent {
  public teacherTypes = TeacherTypeUtils.values;

  public teacher: Teacher = new Teacher(null, null, null, [], [], []);

  public groups: Array<Group> = [];
  public lessons: Array<Lesson> = [];

  public loadingInProgress = true;
  public actionInProgress = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private teachersService: TeachersService,
    private groupsService: GroupsService,
    private lessonsService: LessonsService,
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
      this.teachersService.createTeacher(this.teacher).then(it => {
        this.actionInProgress = false;
        this.router.navigate([`/teachers/${it}`]);
      });
    } else {
      this.teachersService.editTeacher(this.teacher).then(
        () => this.actionInProgress = false
      );
    }
  }

  public delete(): void {
    this.actionInProgress = true;

    this.teachersService.deleteTeacher(this.teacher.id).then(() => {
      this.actionInProgress = false;
      this.router.navigate([`/teachers`]);
    });
  }

  private initTeacher(teacherId: number): void {
    this.teacher.id = teacherId;

    Promise.all([
      this.teachersService.getTeacher(teacherId),
      this.groupsService.getAllGroups(),
      this.lessonsService.getTeacherLessons(teacherId),
    ]).then(it => {
      this.teacher = it[0];
      this.groups = it[1];
      this.lessons = it[2];

      this.loadingInProgress = false;
    });
  }
}

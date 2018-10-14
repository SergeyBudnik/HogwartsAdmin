import {TranslatableComponent} from '../../../translation/translation.component';
import {Component} from '@angular/core';
import {LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group, Lesson, Teacher} from '../../../data';
import {GroupsHttp, TeachersHttp} from '../../../http';

@Component({
  selector: 'app-teacher-timetable-page',
  templateUrl: './teacher-timetable.page.html',
  styleUrls: ['./teacher-timetable.page.less']
})
export class TeacherTimetablePageComponent extends TranslatableComponent {
  public teacher: Teacher = new Teacher();
  public teacherGroups: Array<Group> = [];
  public teacherLessons: Array<Lesson> = [];

  public loadingInProgress = true;

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
        this.teacher.id = Number(params.get('id'));

        this.init(this.teacher.id);
      });
    }
  }

  private init(teacherId: number): void {
    Promise.all([
      this.teachersHttp.getTeacher(teacherId),
      this.groupsHttp.getAllGroups()
    ]).then(it => {
        this.teacher = it[0];

        it[1].forEach(group => {
          this.teacherGroups.push(group);

          group.lessons
            .filter(it => it.teacherId === teacherId)
            .forEach(lesson => this.teacherLessons.push(lesson));
        });

        this.loadingInProgress = false;
    });
  }
}

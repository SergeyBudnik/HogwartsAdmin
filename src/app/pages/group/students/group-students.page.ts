import {TranslatableComponent} from '../../../translation/translation.component';
import {Component} from '@angular/core';
import {GroupService, LoginService, StudentsService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group, Student} from '../../../data';
import {GroupsHttp} from '../../../http';

@Component({
  selector: 'app-group-students-page',
  templateUrl: './group-students.page.html',
  styleUrls: ['./group-students.page.less']
})
export class GroupStudentsPageComponent extends TranslatableComponent {
  public group: Group = new Group();
  public students: Array<Student> = [];

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
    private groupService: GroupService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.group.id = Number(params.get('id'));

        Promise.all([
          this.groupsHttp.getGroup(this.group.id),
          this.studentsService.getGroupStudents(this.group.id)
        ]).then(it => {
          this.group = it[0];
          this.students = this.getSortedStudents(it[1]);

          this.loadingInProgress = false;
        });
      });
    }
  }

  public isStudentActive(student: Student): boolean {
    const currentTime = new Date().getTime();

    return this.groupService.isStudentActive(this.group, student, currentTime);
  }

  public openStudent(studentId: number): void {
    this.router.navigate([`/students/${studentId}/information`]);
  }

  public addNewStudent(): void {
    this.router.navigate([`/students/new/information`], {queryParams: {groupId: this.group.id}});
  }

  private getSortedStudents(students: Array<Student>): Array<Student> {
    const currentTime = new Date().getTime();

    return students
      .sort((o1, o2) => o1.id - o2.id)
      .sort((o1, o2) => {
        const o1Active = this.groupService.isStudentActive(this.group, o1, currentTime) ? 1 : 0;
        const o2Active = this.groupService.isStudentActive(this.group, o2, currentTime) ? 1 : 0;

        return o2Active - o1Active;
      });
  }
}

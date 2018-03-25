import {TranslatableComponent} from '../../../translation/translation.component';
import {Component} from '@angular/core';
import {GroupsService, LoginService, StudentsService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group, Student, StudentUtils} from '../../../data';

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
    private groupsService: GroupsService,
    private studentsService: StudentsService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.group.id = Number(params.get('id'));

        Promise.all([
          this.groupsService.getGroup(this.group.id),
          this.studentsService.getGroupStudents(this.group.id)
        ]).then(it => {
          this.group = it[0];
          this.students = it[1].sort((o1, o2) => o1.id - o2.id);

          this.loadingInProgress = false;
        });
      });
    }
  }

  public openStudent(studentId: number): void {
    this.router.navigate([`/students/${studentId}`]);
  }

  public addNewStudent(): void {
    this.router.navigate([`/students/new`], {queryParams: {groupId: this.group.id}});
  }

  public isStudentValid(student: Student): boolean {
    return StudentUtils.isValid(student);
  }
}

import {Component} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student} from '../../../data';
import {StudentActionsService, GroupsService, LoginService, StudentsService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-attendance-page',
  templateUrl: './student-attendance.page.html',
  styleUrls: ['./student-attendance.page.less']
})
export class StudentAttendancePageComponent extends TranslatableComponent {
  public student: Student = new Student();
  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsService: GroupsService,
    private studentsService: StudentsService,
    private studentActionsService: StudentActionsService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.student.id = Number(params.get('id'));

        Promise.all([
          this.studentsService.getStudent(this.student.id),
          this.studentActionsService.getAttendances(this.student.id)
        ]).then(it => {
          this.student = it[0];

          this.loadingInProgress = false;
        });
      });
    }
  }
}

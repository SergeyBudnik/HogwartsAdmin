import {Component} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student, StudentAttendance, StudentPayment} from '../../../data';
import {GroupsService, LoginService, StudentAttendanceService, StudentsService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-attendance-page',
  templateUrl: './student-attendance.page.html',
  styleUrls: ['./student-attendance.page.less']
})
export class StudentAttendancePageComponent extends TranslatableComponent {
  public student: Student = new Student();
  public loadingInProgress = true;

  public attendances: Array<StudentAttendance> = [];

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsService: GroupsService,
    private studentsService: StudentsService,
    private studentAttendanceService: StudentAttendanceService
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.student.id = Number(params.get('id'));

        Promise.all([
          this.studentsService.getStudent(this.student.id),
          this.studentAttendanceService.getAttendances(this.student.id)
        ]).then(it => {
          this.student = it[0];
          this.attendances = it[1];

          this.loadingInProgress = false;
        });
      });
    }
  }

  public onAttendanceAdded(attendance: StudentAttendance): void {
    this.attendances.push(attendance);
  }

  public onAttendanceDeleted(attendanceId: number): void {
    this.attendances = this.attendances.filter(it => it.id !== attendanceId);
  }
}

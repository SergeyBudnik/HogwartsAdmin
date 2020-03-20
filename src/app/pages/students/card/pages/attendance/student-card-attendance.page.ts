import {Component} from '@angular/core';
import {Student, StudentAttendance} from '../../../../../data';
import {LoginService, StudentsService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {StudentAttendanceHttp} from '../../../../../http';

@Component({
  selector: 'app-student-card-attendance-page',
  templateUrl: './student-card-attendance.page.html',
  styleUrls: ['./student-card-attendance.page.less']
})
export class StudentCardAttendancePage {
  public student: Student = new Student();
  public loadingInProgress = true;

  public attendances: Array<StudentAttendance> = [];

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsService: StudentsService,
    private studentAttendanceHttp: StudentAttendanceHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        this.student.id = Number(params.get('id'));

        Promise.all([
          this.studentsService.getStudent(this.student.id),
          this.studentAttendanceHttp.getAttendances(this.student.id)
        ]).then(it => {
          this.student = it[0];
          this.attendances = it[1].sort((o1, o2) => o2.startTime - o1.startTime);

          this.loadingInProgress = false;
        });
      });
    });
  }

  public onAttendanceAdded(attendance: StudentAttendance): void {
    this.attendances.push(attendance);
  }

  public onAttendanceDeleted(studentAttendance: StudentAttendance): void {
    this.attendances = this.attendances
      .filter(it => {
        let studentIdMatches = it.studentId === studentAttendance.studentId;
        let startTimeMatches = it.startTime === studentAttendance.startTime;

        return !(studentIdMatches && startTimeMatches);
      });
  }
}

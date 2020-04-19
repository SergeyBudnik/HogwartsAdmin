import {Component} from '@angular/core';
import {Student, StudentAttendance} from '../../../../../data';
import {LoginService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {StudentAttendanceHttp, StudentsHttp} from '../../../../../http';

@Component({
  selector: 'app-student-card-attendance-page',
  templateUrl: './student-card-attendance.page.html',
  styleUrls: ['./student-card-attendance.page.less']
})
export class StudentCardAttendancePage {
  public student: Student = null;
  public loadingInProgress = true;

  public attendances: Array<StudentAttendance> = [];

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsHttp: StudentsHttp,
    private studentAttendanceHttp: StudentAttendanceHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        let studentLogin = params.get('login');

        Promise.all([
          this.studentsHttp.getStudent(studentLogin),
          this.studentAttendanceHttp.getAttendances(studentLogin)
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
        let studentIdMatches = it.studentLogin === studentAttendance.studentLogin;
        let startTimeMatches = it.startTime === studentAttendance.startTime;
        let finishTimeMatches = it.finishTime === studentAttendance.finishTime;

        return !(studentIdMatches && startTimeMatches && finishTimeMatches);
      });
  }
}

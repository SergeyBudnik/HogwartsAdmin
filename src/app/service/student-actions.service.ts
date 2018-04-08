import {Injectable} from '@angular/core';
import {StudentActionsHttp} from '../http';
import {StudentAttendance, StudentAttendanceType} from '../data/student-attendance';
import {StudentPayment} from '../data';

@Injectable()
export class StudentActionsService {
  public constructor(
    private studentActionsHttp: StudentActionsHttp
  ) {}

  public getAttendances(studentId: number): Promise<Array<StudentAttendance>> {
    return this.studentActionsHttp.getAttendances(studentId);
  }

  public addAttendance(studentId: number, type: StudentAttendanceType, time: number): Promise<void> {
    return this.studentActionsHttp.addAttendance(studentId, type, time);
  }

  public getPayments(studentId: number): Promise<Array<StudentPayment>> {
    return this.studentActionsHttp.getPayments(studentId);
  }

  public addPayment(studentId: number, amount: number, time: number): Promise<void> {
    return this.studentActionsHttp.addPayment(studentId, amount, time);
  }
}

import {Injectable} from '@angular/core';
import {StudentActionsHttp} from '../http';
import {StudentAttendance, StudentAttendanceType} from '../data/student-attendance';

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
}

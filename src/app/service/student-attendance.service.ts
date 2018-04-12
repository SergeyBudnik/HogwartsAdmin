import {Injectable} from '@angular/core';
import {StudentAttendance, StudentAttendanceType} from '../data';
import {StudentAttendanceHttp} from '../http';

@Injectable()
export class StudentAttendanceService {
  public constructor(
    private studentAttendanceHttp: StudentAttendanceHttp
  ) {}

  public getAttendances(studentId: number): Promise<Array<StudentAttendance>> {
    return this.studentAttendanceHttp.getAttendances(studentId);
  }

  public addAttendance(studentId: number, type: StudentAttendanceType, time: number): Promise<number> {
    return this.studentAttendanceHttp.addAttendance(studentId, type, time);
  }

  public deleteAttendance(attendanceId: number): Promise<void> {
    return this.studentAttendanceHttp.deleteAttendance(attendanceId);
  }
}

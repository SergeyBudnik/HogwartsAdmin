import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentAttendance, StudentAttendanceType} from '../data';

@Injectable()
export class StudentAttendanceHttp {
  private root = 'http://34.216.34.197:8080/HogwartsAPI/student-attendance';

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAttendances(studentId: number): Promise<Array<StudentAttendance>> {
    return this.http
      .get<Array<StudentAttendance>>(`${this.root}/${studentId}`)
      .toPromise();
  }

  public addAttendance(studentId: number, type: StudentAttendanceType, time: number): Promise<number> {
    return this.http
      .post(`${this.root}/${studentId}`, {type: type, time: time})
      .toPromise()
      .then(it => Number(it));
  }

  public deleteAttendance(attendanceId: number): Promise<void> {
    return this.http
      .delete(`${this.root}/${attendanceId}`)
      .toPromise()
      .then(() => {});
  }
}

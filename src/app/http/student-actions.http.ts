import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentAttendance, StudentAttendanceType} from '../data/student-attendance';

@Injectable()
export class StudentActionsHttp {
  private root = 'http://34.216.34.197:8080/HogwartsAPI/student-actions';

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAttendances(studentId: number): Promise<Array<StudentAttendance>> {
    return this.http
      .get<Array<StudentAttendance>>(`${this.root}/${studentId}/attencance`)
      .toPromise();
  }

  public addAttendance(studentId: number, type: StudentAttendanceType, time: number): Promise<void> {
    return this.http
      .post(`${this.root}/${studentId}/attencance`, {type: type, time: time})
      .toPromise()
      .then(() => {});
  }
}

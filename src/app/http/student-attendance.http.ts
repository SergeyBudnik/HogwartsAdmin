import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentAttendance, StudentAttendanceType} from '../data';
import {HttpConfig} from './http-config';

@Injectable()
export class StudentAttendanceHttp {
  private root = `${HttpConfig.getBackendRoot()}/student-attendance`;

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

  public deleteAttendance(studentId: number, startTime: number): Promise<void> {
    return this.http
      .delete(`${this.root}/student/${studentId}/start-time/${startTime}`)
      .toPromise()
      .then(() => {});
  }
}

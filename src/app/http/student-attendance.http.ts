import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentAttendance, StudentAttendanceId, StudentAttendanceType} from '../data';
import {HttpConfig} from './http-config';

@Injectable()
export class StudentAttendanceHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/students/attendances`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAttendances(studentLogin: string): Promise<Array<StudentAttendance>> {
    return this.http
      .get<Array<StudentAttendance>>(`${this.root}/student/${studentLogin}`)
      .toPromise();
  }

  public deleteAttendance(attendanceId: StudentAttendanceId): Promise<void> {
    // todo
    return this.http
      .delete(`${this.root}`)
      .toPromise()
      .then(() => {});
  }
}

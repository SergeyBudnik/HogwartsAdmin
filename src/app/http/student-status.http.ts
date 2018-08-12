import {Injectable} from '@angular/core';
import {HttpConfig} from './http-config';
import {HttpClient} from '@angular/common/http';
import {StudentStatus} from '../data';

@Injectable()
export class StudentStatusHttp {
  private root = `${HttpConfig.getBackendRoot()}/students-status`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getStatuses(studentId: number): Promise<Array<StudentStatus>> {
    return this.http
      .get<Array<StudentStatus>>(`${this.root}/${studentId}`)
      .toPromise()
  }
}

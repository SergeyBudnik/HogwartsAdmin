import {Injectable} from '@angular/core';
import {HttpConfig} from './http-config';
import {Student} from '../data';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StudentsHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/students/management`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllStudents(): Promise<Array<Student>> {
    return this.http.get<Array<Student>>(this.root).toPromise();
  }

  public getStudent(studentLogin: string): Promise<Student> {
    return this.http.get<Student>(`${this.root}/${studentLogin}`).toPromise();
  }

  public createStudent(student: Student): Promise<void> {
    return this.http.post(`${this.root}`, student).toPromise().then(() => {});
  }

  public editStudent(student: Student): Promise<void> {
    return this.http.put(`${this.root}`, student).toPromise().then(() => {});
  }

  public deleteStudent(studentLogin: string): Promise<void> {
    return this.http.delete(`${this.root}/${studentLogin}`).toPromise().then(() => {});
  }
}

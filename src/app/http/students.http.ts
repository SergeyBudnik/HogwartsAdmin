import {Student} from '../data';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';

@Injectable()
export class StudentsHttp {
  private root = `${HttpConfig.getBackendRoot()}/students`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllStudents(): Promise<Array<Student>> {
    return this.http.get<Array<Student>>(this.root).toPromise();
  }

  public getStudent(studentId: number): Promise<Student> {
    return this.http.get<Student>(`${this.root}/${studentId}`).toPromise();
  }

  public createStudent(student: Student): Promise<number> {
    return this.http.post(`${this.root}`, student).toPromise().then(it => Number(it));
  }

  public editStudent(student: Student): Promise<void> {
    return this.http.put(`${this.root}`, student).toPromise().then(() => {});
  }

  public deleteStudent(studentId: number): Promise<void> {
    return this.http.delete(`${this.root}/${studentId}`).toPromise().then(() => {});
  }
}

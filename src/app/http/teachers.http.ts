import {Injectable} from '@angular/core';
import {Teacher} from '../data';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';

@Injectable()
export class TeachersHttp {
  private root = `${HttpConfig.getBackendRoot()}/teachers`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllTeachers(): Promise<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.root).toPromise();
  }

  public getTeacher(teacherId: number): Promise<Teacher> {
    return this.http.get<Teacher>(`${this.root}/id/${teacherId}`).toPromise();
  }

  public createTeacher(teacher: Teacher): Promise<number> {
    return this.http.post(`${this.root}`, teacher).toPromise().then(it => Number(it));
  }

  public editTeacher(teacher: Teacher): Promise<void> {
    return this.http.put(`${this.root}`, teacher).toPromise().then(() => {});
  }

  public deleteTeacher(teacherId: number): Promise<void> {
    return this.http.delete(`${this.root}/${teacherId}`).toPromise().then(() => {});
  }
}

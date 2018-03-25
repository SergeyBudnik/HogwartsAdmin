import {Injectable} from '@angular/core';
import {Teacher} from '../data';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TeachersHttp {
  private root = 'http://34.216.34.197:8080/HogwartsAPI/teachers';

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllTeachers(): Promise<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.root).toPromise();
  }

  public getTeacher(teacherId: number): Promise<Teacher> {
    return this.http.get<Teacher>(`${this.root}/${teacherId}`).toPromise();
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

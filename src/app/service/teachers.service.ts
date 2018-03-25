import {Injectable} from '@angular/core';
import {Teacher} from '../data';
import {TeachersHttp} from '../http';

@Injectable()
export class TeachersService {
  public constructor(
    private teachersHttp: TeachersHttp
  ) {}

  public getAllTeachers(): Promise<Array<Teacher>> {
    return this.teachersHttp.getAllTeachers();
  }

  public getTeacher(id: number): Promise<Teacher> {
    return this.teachersHttp.getTeacher(id);
  }

  public createTeacher(teacher: Teacher): Promise<number> {
    return this.teachersHttp.createTeacher(teacher);
  }

  public editTeacher(teacher: Teacher): Promise<void> {
    return this.teachersHttp.editTeacher(teacher);
  }

  public deleteTeacher(id: number): Promise<void> {
    return this.teachersHttp.deleteTeacher(id);
  }
}

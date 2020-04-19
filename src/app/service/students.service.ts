import {Student} from '../data';
import {Injectable} from '@angular/core';
import {StudentsHttp} from '../http';

@Injectable()
export class StudentsService {
  public constructor(
    private studentsHttp: StudentsHttp
  ) {}

  public getAllStudents(): Promise<Array<Student>> {
    return this.studentsHttp.getAllStudents();
  }

  public getGroupStudents(groupId: number): Promise<Array<Student>> {
    return this.studentsHttp
      .getAllStudents()
      .then(students => students.filter(student => student.studentGroups.map(it => it.groupId).find(it => it === groupId)));
  }

  public getStudent(studentLogin: string): Promise<Student> {
    return this.studentsHttp.getStudent(studentLogin);
  }
}

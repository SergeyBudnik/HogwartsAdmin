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
      .then(students => students.filter(student => student.groupIds.find(it => it === groupId)));
  }

  public getStudent(studentId: number): Promise<Student> {
    return this.studentsHttp.getStudent(studentId);
  }

  public createStudent(student: Student): Promise<number> {
    return this.studentsHttp.createStudent(student);
  }

  public editStudent(student: Student): Promise<void> {
    return this.studentsHttp.editStudent(student);
  }

  public deleteStudent(studentId: number): Promise<void> {
    return this.studentsHttp.deleteStudent(studentId);
  }
}

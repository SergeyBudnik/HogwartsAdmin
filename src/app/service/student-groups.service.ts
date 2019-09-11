import {Injectable} from '@angular/core';
import {Student, StudentGroup} from '../data';

@Injectable()
export class StudentGroupsService {
  public getStudentActiveGroups(student: Student): Array<StudentGroup> {
    const activeStudentGroups: Array<StudentGroup> = [];
    const currentTime = new Date().getTime();

    student.studentGroups
      .filter(studentGroup => this.isStudentGroupActive(currentTime, studentGroup))
      .forEach(studentGroup => activeStudentGroups.push(studentGroup));

    return activeStudentGroups;
  }

  private isStudentGroupActive(time: number, studentGroup: StudentGroup): boolean {
    const startTimeMatches = studentGroup.startTime < time;
    const finishTimeMatches = !studentGroup.finishTime || time < studentGroup.finishTime;

    return startTimeMatches && finishTimeMatches;
  }
}

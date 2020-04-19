import {Age, Cabinet, EducationLevel, Group, Lesson, StaffMember, Student} from '../data';
import {Injectable} from '@angular/core';

@Injectable()
export class GroupService {
  public getMatchingGroups(groups: Array<Group>, age: Age, educationLevel: EducationLevel): Array<Group> {
    return groups
      .filter(group => group.age === age)
      .filter(group => group.educationLevel === educationLevel)
  }

  public getGroupHeadTeacher(group: Group, staffMembers: Array<StaffMember>): StaffMember {
    return staffMembers.find(staffMember => staffMember.login === group.headTeacherLogin);
  }

  public getGroupCabinet(group: Group, allCabinets: Array<Cabinet>): Cabinet {
    return allCabinets.find(cabinet => cabinet.id === group.cabinetId);
  }

  public getGroupActiveStudents(group: Group, allStudents: Array<Student>, time: number): Array<Student> {
    return allStudents
      .filter(student => this.isStudentActive(group, student, time))
      .filter(student => student.statusType == 'STUDYING');
  }

  public getGroupActiveLessons(group: Group, time: number): Array<Lesson> {
    return group
      .lessons
      .filter(lesson => {
        const creationTimeMatches = lesson.creationTime <= time;
        const deactivationTimeMatches = !lesson.deactivationTime || time <= lesson.deactivationTime;

        return creationTimeMatches && deactivationTimeMatches;
      });
  }

  public isGroupActive(group: Group, allStudents: Array<Student>, time: number): boolean {
    return this.isGroupHasActiveLessons(group, time) && this.getGroupActiveStudents(group, allStudents, time).length !== 0;
  }

  public isStudentActive(group: Group, student: Student, time: number) {
    return student
      .studentGroups
      .filter(studentGroup => studentGroup.startTime <= time)
      .filter(studentGroup => !studentGroup.finishTime || time < studentGroup.finishTime)
      .filter(studentGroup => studentGroup.groupId == group.id)
      .length != 0;
  }

  public isGroupHasActiveLessons(group: Group, time: number): boolean {
    return this.getGroupActiveLessons(group, time).length !== 0;
  }

  public getGroupName(staffMember: StaffMember, groupStudents: Array<Student>): string {
    if (!staffMember) {
      return ""
    } else {
      return `${staffMember.person.name} - ${this.getGroupStudentsNames(groupStudents)}`;
    }
  }

  private getGroupStudentsNames(groupStudents: Array<Student>): String {
    if (groupStudents.length == 0) {
      return 'Нет студентов';
    } else {
      return groupStudents
        .map(it => it.person.name)
        .map(it => it.split(' ')[0]).reduce((n1, n2) => `${n1}; ${n2}`);
    }
  }
}

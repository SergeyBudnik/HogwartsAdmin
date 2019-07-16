import {Age, EducationLevel, Group, Student, Teacher} from '../data';

export class GroupService {
  public getMatchingGroups(groups: Array<Group>, age: Age, educationLevel: EducationLevel): Array<Group> {
    return groups
      .filter(group => group.age === age)
      .filter(group => group.educationLevel === educationLevel)
  }

  public getGroupName(teacher: Teacher, groupStudents: Array<Student>): string {
    return `${teacher.name} - ${this.getGroupStudentsNames(groupStudents)}`;
  }

  private getGroupStudentsNames(groupStudents: Array<Student>): String {
    if (groupStudents.length == 0) {
      return 'Нет студентов';
    } else {
      return groupStudents
        .map(it => it.name)
        .map(it => it.split(' ')[0]).reduce((n1, n2) => `${n1}; ${n2}`);
    }
  }
}

import {Person} from './person';
import {EducationInfo} from './education-info';
import {StudentGroup} from './student-group';
import {StudentStatusType} from './student-status';

export class Student {
  constructor(
    public login: string,
    public person: Person,
    public educationInfo: EducationInfo,
    public studentGroups: Array<StudentGroup>,
    public statusType: StudentStatusType
  ) {}

  public static createNew(): Student {
    return new Student("", new Person(), new EducationInfo(), [], 'STUDYING');
  }
}

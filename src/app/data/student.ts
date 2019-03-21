import {EducationLevel} from './education-level';
import {Age} from './age';
import {StudentStatusType} from './student-status';

export class Student {
  public constructor(
    public id: number = null,
    public groupIds: Array<number> = [],
    public name: string = null,
    public statusType: StudentStatusType = 'STUDYING',
    public emails: Array<string> = [],
    public phones: Array<string> = [],
    public vkLink: string = "",
    public age: Age = 'UNKNOWN',
    public educationLevel: EducationLevel = 'UNKNOWN'
  ) {}
}

export class StudentUtils {
  public static isValid(student: Student) {
    const nameValid = !!student.name && student.name.indexOf('?') === -1;

    const educationLevelKnown = student.educationLevel !== 'UNKNOWN';
    const ageKnown = student.age !== 'UNKNOWN';
    const hasAtLeastOneContact = student.phones.length !== 0 || student.emails.length !== 0 || !!student.vkLink;

    return nameValid && educationLevelKnown && ageKnown && hasAtLeastOneContact;
  }
}

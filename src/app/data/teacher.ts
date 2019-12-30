import {TeacherAvailability} from './teacher-availability';

export type TeacherType = 'NATIVE' | 'NON_NATIVE';

export class TeacherTypeUtils {
  public static values: Array<TeacherType> = ['NATIVE', 'NON_NATIVE'];

  public static getTranslation(teacherType: TeacherType): string {
    switch (teacherType) {
      case 'NATIVE':
        return 'Носитель';
      case 'NON_NATIVE':
        return 'Русскоговорящий';
      default:
        throw new Error(`Unexpected teacher type ${teacherType}`);
    }
  }
}

export class Teacher {
  public constructor(
    public name: string = null,
    public login: string = null,
    public type: TeacherType = null,
    public phones: Array<string> = [],
    public emails: Array<string> = [],
    public availability: Array<TeacherAvailability> = []
  ) {}
}

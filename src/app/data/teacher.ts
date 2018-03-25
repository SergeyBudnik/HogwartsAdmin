import {DayAndTime} from './day-and-time';

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
    public id: number = null,
    public name: string = null,
    public type: TeacherType = null,
    public phones: Array<string> = [],
    public emails: Array<string> = [],
    public workingHours: Array<DayAndTime> = []
  ) {}
}

export type StudentStatusType =
  'UNKNOWN' | 'REQUEST' | 'TEST_ASSIGNED' | 'FREE_LESSON_ASSIGNED' | 'GROUP_ASSIGNED' | 'TEMPORARILY_STOPPED' | 'LEFT';

export class StudentStatusTypeUtils {
  public static values: Array<StudentStatusType> =
    ['UNKNOWN', 'REQUEST', 'TEST_ASSIGNED', 'FREE_LESSON_ASSIGNED', 'GROUP_ASSIGNED', 'TEMPORARILY_STOPPED', 'LEFT'];

  public static getStudentStatusTypeTranslation(studentStatus: StudentStatusType): string {
    switch (studentStatus) {
      case 'UNKNOWN':
        return 'Не известно';
      case 'REQUEST':
        return 'Оставил заявку';
      case 'TEST_ASSIGNED':
        return 'Записан на тестирование';
      case 'FREE_LESSON_ASSIGNED':
        return 'Записан на бесплатный урок';
      case 'GROUP_ASSIGNED':
        return 'Занимается';
      case 'TEMPORARILY_STOPPED':
        return 'Временно приостановил';
      case 'LEFT':
        return 'Покинул занятия';
      default:
        throw new Error(`Unexpected student status ${studentStatus}`);
    }
  }
}

export class StudentStatus {
  public constructor(
    id: number,
    studentId: number,
    status: StudentStatusType,
    creationTime: number
  ) {}
}

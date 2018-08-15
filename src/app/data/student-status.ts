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

  public static compare(s1: StudentStatusType, s2: StudentStatusType): number {
    let i1 = StudentStatusTypeUtils.values.findIndex(it => it == s1);
    let i2 = StudentStatusTypeUtils.values.findIndex(it => it == s2);

    return i1 - i2;
  }
}

export class StudentStatus {
  public constructor(
    public id: number,
    public studentId: number,
    public status: StudentStatusType,
    public creationTime: number,
    public actionTime: number
  ) {}
}

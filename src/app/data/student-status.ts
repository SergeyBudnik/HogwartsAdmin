export type StudentStatusType =
  'UNKNOWN' |
  'REQUEST' |
  'TEST_LEFT_BEFORE' |
  'TEST' |
  'TEST_STOPPED_AFTER' |
  'TEST_LEFT_AFTER' |
  'FREE_LESSON_DISCUSS_TIME' |
  'FREE_LESSON' |
  'FREE_LESSON_STOPPED_AFTER' |
  'FREE_LESSON_LEFT_AFTER' |
  'AWAITING_GROUP' |
  'AWAITING_GROUP_STOPPED' |
  'AWAITING_GROUP_LEFT' |
  'STUDYING' |
  'STUDYING_LEFT'

export class StudentStatusTypeUtils {
  public static values: Array<StudentStatusType> =
    [
      'UNKNOWN',
      'REQUEST',
      'TEST_LEFT_BEFORE',
      'TEST',
      'TEST_STOPPED_AFTER',
      'TEST_LEFT_AFTER',
      'FREE_LESSON_DISCUSS_TIME',
      'FREE_LESSON',
      'FREE_LESSON_STOPPED_AFTER',
      'FREE_LESSON_LEFT_AFTER',
      'AWAITING_GROUP',
      'AWAITING_GROUP_STOPPED',
      'AWAITING_GROUP_LEFT',
      'STUDYING',
      'STUDYING_LEFT'
    ];

  public static getStudentStatusTypeTranslation(studentStatus: StudentStatusType): string {
    switch (studentStatus) {
      case 'UNKNOWN':
        return 'Не известно';
      case 'REQUEST':
        return 'Оставил заявку';
      case 'TEST_LEFT_BEFORE':
        return 'Покинул до теста';
      case 'TEST':
        return 'Тест назначен';
      case 'TEST_STOPPED_AFTER':
        return 'Приостановил после теста';
      case 'TEST_LEFT_AFTER':
        return 'Покинул после теста';
      case 'FREE_LESSON_DISCUSS_TIME':
        return 'Обсудить время бесплатного занятия';
      case 'FREE_LESSON':
        return 'Бесплатное занятие назначено';
      case 'FREE_LESSON_STOPPED_AFTER':
        return 'Приостановил после бесплатного занятия';
      case 'FREE_LESSON_LEFT_AFTER':
        return 'Покинул после бесплатного занятия';
      case 'AWAITING_GROUP':
        return 'Ожидает группу';
      case 'AWAITING_GROUP_STOPPED':
        return 'Приостановил в ожидании группы';
      case 'AWAITING_GROUP_LEFT':
        return 'Покинул в ожидании группы';
      case 'STUDYING':
        return 'Занимается';
      case 'STUDYING_LEFT':
        return 'Покинул';
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

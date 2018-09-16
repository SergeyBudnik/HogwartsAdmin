export type StudentStatusType =
  'UNKNOWN' |

  'REQUEST' |
  'REQUEST_LEFT' |

  'TEST' |
  'TEST_STOPPED' |
  'TEST_LEFT' |

  'FREE_LESSON' |
  'FREE_LESSON_STOPPED' |
  'FREE_LESSON_LEFT' |

  'AWAITING_GROUP' |
  'AWAITING_GROUP_STOPPED' |
  'AWAITING_GROUP_LEFT' |

  'STUDYING' |
  'STUDYING_STOPPED' |
  'STUDYING_LEFT'

export class StudentStatusTypeUtils {
  public static values: Array<StudentStatusType> =
    [
      'UNKNOWN',
      'REQUEST',
      'REQUEST_LEFT',
      'TEST',
      'TEST_STOPPED',
      'TEST_LEFT',
      'FREE_LESSON',
      'FREE_LESSON_STOPPED',
      'FREE_LESSON_LEFT',
      'AWAITING_GROUP',
      'AWAITING_GROUP_STOPPED',
      'AWAITING_GROUP_LEFT',
      'STUDYING',
      'STUDYING_STOPPED',
      'STUDYING_LEFT'
    ];

  public static getStudentStatusTypeTranslation(studentStatus: StudentStatusType): string {
    switch (studentStatus) {
      case 'UNKNOWN':
        return 'Не известно';
      case 'REQUEST':
        return 'Оставил заявку';
      case 'REQUEST_LEFT':
        return 'Покинул до теста';
      case 'TEST':
        return 'Тест назначен';
      case 'TEST_STOPPED':
        return 'Приостановил после теста';
      case 'TEST_LEFT':
        return 'Покинул после теста';
      case 'FREE_LESSON':
        return 'Бесплатное занятие назначено';
      case 'FREE_LESSON_STOPPED':
        return 'Приостановил после бесплатного занятия';
      case 'FREE_LESSON_LEFT':
        return 'Покинул после бесплатного занятия';
      case 'AWAITING_GROUP':
        return 'Ожидает группу';
      case 'AWAITING_GROUP_STOPPED':
        return 'Приостановил в ожидании группы';
      case 'AWAITING_GROUP_LEFT':
        return 'Покинул в ожидании группы';
      case 'STUDYING':
        return 'Занимается';
      case 'STUDYING_STOPPED':
        return 'Приостановил';
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

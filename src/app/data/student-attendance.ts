export type StudentAttendanceType = 'VISIT' | 'SKIP_VALID' | 'SKIP_INVALID';

export class StudentAttendanceTypeUtils {
  public static values: Array<StudentAttendanceType> = [
    'VISIT', 'SKIP_VALID', 'SKIP_INVALID'
  ];

  public static getTranslation(type: StudentAttendanceType) {
    switch (type) {
      case 'VISIT':
        return 'Посещено';
      case 'SKIP_VALID':
        return 'Уважительный пропуск';
      case 'SKIP_INVALID':
        return 'Пропуск';
      default:
        throw new Error(`Unexpected attendance type ${type}`);
    }
  }
}

export class StudentAttendance {
  public constructor(
    public id: number,
    public studentId: number,
    public type: StudentAttendanceType,
    public time: number
  ) {}
}

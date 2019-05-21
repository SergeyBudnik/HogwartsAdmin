export type StudentAttendanceType = 'VISITED' | 'VALID_SKIP' | 'INVALID_SKIP';

export class StudentAttendanceTypeUtils {
  public static values: Array<StudentAttendanceType> = [
    'VISITED', 'VALID_SKIP', 'INVALID_SKIP'
  ];

  public static getTranslation(type: StudentAttendanceType) {
    switch (type) {
      case 'VISITED':
        return 'Посещено';
      case 'VALID_SKIP':
        return 'Уважительный пропуск';
      case 'INVALID_SKIP':
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
    public startTime: number,
    public finishTime: number
  ) {}
}

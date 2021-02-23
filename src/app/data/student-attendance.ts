export type StudentAttendanceType = 'VISITED' | 'VALID_SKIP' | 'INVALID_SKIP' | 'FREE_LESSON';

export class StudentAttendanceTypeUtils {
  public static values: Array<StudentAttendanceType> = [
    'VISITED', 'VALID_SKIP', 'INVALID_SKIP', 'FREE_LESSON'
  ];
}

export class StudentAttendance {
  public constructor(
    public studentLogin: string,
    public type: StudentAttendanceType,
    public startTime: number,
    public finishTime: number
  ) {}
}

export class StudentAttendanceId {
  constructor(
    public studentLogin: string,
    public startTime: number,
    public finishTime: number
  ) {}
}

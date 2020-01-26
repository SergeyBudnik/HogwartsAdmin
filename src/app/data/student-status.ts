export type StudentStatusType =
  'STUDYING' |
  'STOPPED' |
  'LEFT'

export class StudentStatusTypeUtils {
  public static values: Array<StudentStatusType> =
    [
      'STUDYING',
      'STOPPED',
      'LEFT'
    ];

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

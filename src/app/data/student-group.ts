export class StudentGroup {
  public constructor(
    public groupId: number = 0,
    public startTime: number = 0,
    public finishTime: number = null
  ) {}

  public static copy(studentGroup: StudentGroup): StudentGroup {
    return new StudentGroup(
      studentGroup.groupId,
      studentGroup.startTime,
      studentGroup.finishTime
    );
  }
}

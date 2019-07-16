export class StudentPayment {
  public constructor(
    public id: number,
    public studentId: number,
    public teacherId: number,
    public amount: number,
    public time: number
  ) {}
}

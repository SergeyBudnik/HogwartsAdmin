export class StudentPayment {
  public constructor(
    public id: number,
    public studentId: number,
    public staffMemberLogin: string,
    public amount: number,
    public time: number
  ) {}
}

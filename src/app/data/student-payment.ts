export class NewStudentPayment {
  constructor(
    public studentId: number,
    public staffMemberLogin: string,
    public amount: number,
    public time: number
  ) {}

  public static createNew() {
    return new NewStudentPayment(null, null, null, null);
  }
}

export class StudentPayment {
  public constructor(
    public id: number,
    public studentId: number,
    public staffMemberLogin: string,
    public amount: number,
    public time: number,
    public processed: boolean
  ) {}

  public static createNew(paymentId: number, newStudentPayment: NewStudentPayment) {
    return new StudentPayment(
      paymentId,
      newStudentPayment.studentId,
      newStudentPayment.staffMemberLogin,
      newStudentPayment.amount,
      newStudentPayment.time,
      false
    );
  }

  public static createProcessed(studentPayment: StudentPayment, processed: boolean): StudentPayment {
    return new StudentPayment(
      studentPayment.id,
      studentPayment.studentId,
      studentPayment.staffMemberLogin,
      studentPayment.amount,
      studentPayment.time,
      processed
    );
  }
}

export class NewStudentPayment {
  constructor(
    public info: StudentPaymentInfo
  ) {}

  public static createNew() {
    return new NewStudentPayment(
      new StudentPaymentInfo(null, null, null, null)
    );
  }
}

export class ExistingStudentPayment {
  public constructor(
    public id: number,
    public info: StudentPaymentInfo,
    public processed: boolean
  ) {}

  public static createNew(paymentId: number, newStudentPayment: NewStudentPayment) {
    return new ExistingStudentPayment(
      paymentId,
      new StudentPaymentInfo(
        newStudentPayment.info.studentLogin,
        newStudentPayment.info.staffMemberLogin,
        newStudentPayment.info.amount,
        newStudentPayment.info.time
      ),
      false
    );
  }

  public static createProcessed(studentPayment: ExistingStudentPayment, processed: boolean): ExistingStudentPayment {
    return new ExistingStudentPayment(
      studentPayment.id,
      new StudentPaymentInfo(
        studentPayment.info.studentLogin,
        studentPayment.info.staffMemberLogin,
        studentPayment.info.amount,
        studentPayment.info.time
      ),
      processed
    );
  }
}

export class StudentPaymentInfo {
  constructor(
    public studentLogin: string,
    public staffMemberLogin: string,
    public amount: number,
    public time: number
  ) {}
}

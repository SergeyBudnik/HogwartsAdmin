import {Injectable} from '@angular/core';
import {StudentPayment} from '../data';
import {StudentPaymentHttp} from '../http';

@Injectable()
export class StudentPaymentService {
  public constructor(
    private studentPaymentHttp: StudentPaymentHttp
  ) {}

  public getPayments(studentId: number): Promise<Array<StudentPayment>> {
    return this.studentPaymentHttp.getPayments(studentId);
  }

  public addPayment(studentId: number, amount: number, time: number): Promise<number> {
    return this.studentPaymentHttp.addPayment(studentId, amount, time);
  }

  public deletePayment(paymentId: number): Promise<void> {
    return this.studentPaymentHttp.deletePayment(paymentId);
  }
}

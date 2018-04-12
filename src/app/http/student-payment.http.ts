import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentPayment} from '../data';

@Injectable()
export class StudentPaymentHttp {
  private root = 'http://34.216.34.197:8080/HogwartsAPI/student-payment';

  public constructor(
    readonly http: HttpClient
  ) {}

  public getPayments(studentId: number): Promise<Array<StudentPayment>> {
    return this.http
      .get<Array<StudentPayment>>(`${this.root}/${studentId}`)
      .toPromise()
  }

  public addPayment(studentId: number, amount: number, time: number): Promise<number> {
    return this.http
      .post(`${this.root}/${studentId}`, {amount: amount, time: time})
      .toPromise()
      .then(it => Number(it));
  }

  public deletePayment(paymentId: number): Promise<void> {
    return this.http
      .delete(`${this.root}/${paymentId}`)
      .toPromise()
      .then(() => {});
  }
}

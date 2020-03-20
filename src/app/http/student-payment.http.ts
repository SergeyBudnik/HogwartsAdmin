import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewStudentPayment, StudentPayment} from '../data';
import {HttpConfig} from './http-config';

@Injectable()
export class StudentPaymentHttp {
  private root = `${HttpConfig.getBackendRoot()}/student-payment`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllPayments(): Promise<Array<StudentPayment>> {
    return this.http
      .get<Array<StudentPayment>>(`${this.root}`)
      .toPromise()
  }

  public getPayments(studentId: number): Promise<Array<StudentPayment>> {
    return this.http
      .get<Array<StudentPayment>>(`${this.root}/${studentId}`)
      .toPromise()
  }

  public addPayment(newStudentPayment: NewStudentPayment): Promise<number> {
    return this.http
      .post(`${this.root}`, newStudentPayment)
      .toPromise()
      .then(it => Number(it));
  }

  public deletePayment(paymentId: number): Promise<void> {
    return this.http
      .delete(`${this.root}/${paymentId}`)
      .toPromise()
      .then(() => {});
  }

  public processPayment(paymentId: number, processed: boolean): Promise<void> {
    return this.http
      .put(`${this.root}/processed/${paymentId}/${processed}`, {})
      .toPromise()
      .then(() => {})
  }
}

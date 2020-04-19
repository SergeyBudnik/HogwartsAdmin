import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewStudentPayment, ExistingStudentPayment} from '../data';
import {HttpConfig} from './http-config';

@Injectable()
export class StudentPaymentHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/students/payments`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllPayments(): Promise<Array<ExistingStudentPayment>> {
    return this.http
      .get<Array<ExistingStudentPayment>>(`${this.root}`)
      .toPromise()
  }

  public getPayments(studentLogin: string): Promise<Array<ExistingStudentPayment>> {
    return this.http
      .get<Array<ExistingStudentPayment>>(`${this.root}/student/${studentLogin}`)
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
      .put(`${this.root}/${paymentId}/processed/${processed}`, {})
      .toPromise()
      .then(() => {})
  }
}

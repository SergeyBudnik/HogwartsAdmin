import {Injectable} from '@angular/core';
import {Group, Student, StudentPayment, TimeUtils} from '../data';
import {StudentPaymentHttp} from '../http';

@Injectable()
export class StudentPaymentService {
  public constructor(
    private studentPaymentHttp: StudentPaymentHttp
  ) {}

  public getAllPayments(): Promise<Array<StudentPayment>> {
    return this.studentPaymentHttp.getAllPayments();
  }

  public getPayments(studentId: number): Promise<Array<StudentPayment>> {
    return this.studentPaymentHttp.getPayments(studentId);
  }

  public addPayment(studentId: number, amount: number, time: number): Promise<number> {
    return this.studentPaymentHttp.addPayment(studentId, amount, time);
  }

  public deletePayment(paymentId: number): Promise<void> {
    return this.studentPaymentHttp.deletePayment(paymentId);
  }

  public getGroupPayment(group: Group, students: Array<Student>) {
    let payment = 0;

    group.lessons.forEach(lesson => {
      let difference = TimeUtils.index(lesson.finishTime) - TimeUtils.index(lesson.startTime);

      if (group.type === 'INDIVIDUAL') {
        if (difference === 2) {
          payment += 1100
        } else if (difference === 3) {
          payment += 1650
        } else if (difference === 4) {
          payment += 2200
        }
      } else {
        if (difference == 2) {
          if (students.length == 1) {
            payment += 700
          } else {
            payment += students.length * 470
          }
        } else if (difference == 3) {
          if (students.length == 1) {
            payment += 1050
          } else {
            payment += students.length * 700
          }
        } else if (difference == 4) {
          payment += students.length * 930
        }
      }
    });

    return payment;
  }
}

import {Component} from '@angular/core';
import {StaffMember, ExistingStudentPayment, Student} from '../../../../../data';
import {LoginService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {StaffMembersHttp, StudentPaymentHttp, StudentsHttp} from '../../../../../http';
import {StudentCardPaymentAddPopupManager} from './views';
import {PaymentProcessInfo} from './data/payment-process-info';

@Component({
  selector: 'app-student-card-payment-page',
  templateUrl: './student-card-payment.page.html',
  styleUrls: ['./student-card-payment.page.less']
})
export class StudentCardPaymentPage {
  public loadingInProgress = true;

  public student: Student = null;

  public payments: Array<ExistingStudentPayment> = [];
  public staffMembers: Array<StaffMember> = [];

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsHttp: StudentsHttp,
    private studentPaymentHttp: StudentPaymentHttp,
    private staffMembersHttp: StaffMembersHttp,
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        let login = params.get('login');

        Promise.all([
          this.studentsHttp.getStudent(login),
          this.studentPaymentHttp.getPayments(login),
          this.staffMembersHttp.getAllStaffMembers()
        ]).then(it => {
          this.student = it[0];
          this.payments = it[1];
          this.staffMembers = it[2];

          this.loadingInProgress = false;
        });
      });
    });
  }

  public addPayment() {
    StudentCardPaymentAddPopupManager.show(
      this.student.login,
      this.staffMembers
    );
  }

  public onPaymentAdded(payment: ExistingStudentPayment) {
    this.payments.push(payment);
  }

  public onPaymentDeleted(paymentId: number): void {
    this.payments = this.payments.filter(it => it.id !== paymentId);
  }

  public onPaymentProcessed(paymentProcessInfo: PaymentProcessInfo): void {
    this.payments = this.payments.map(it => {
      let processed = it.id === paymentProcessInfo.paymentId ? paymentProcessInfo.processed : it.processed;

      return ExistingStudentPayment.createProcessed(it, processed);
    })
  }
}

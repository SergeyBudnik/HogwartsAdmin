import {Component} from '@angular/core';
import {StaffMember, Student, StudentPayment} from '../../../../../data';
import {LoginService, StudentsService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {StaffMembersHttp, StudentPaymentHttp} from '../../../../../http';

@Component({
  selector: 'app-student-card-payment-page',
  templateUrl: './student-card-payment.page.html',
  styleUrls: ['./student-card-payment.page.less']
})
export class StudentCardPaymentPage {
  public student: Student = new Student();
  public loadingInProgress = true;

  public payments: Array<StudentPayment> = [];
  public staffMembers: Array<StaffMember> = [];

  public constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsService: StudentsService,
    private studentPaymentHttp: StudentPaymentHttp,
    private staffMembersHttp: StaffMembersHttp,
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        this.student.id = Number(params.get('id'));

        Promise.all([
          this.studentsService.getStudent(this.student.id),
          this.studentPaymentHttp.getPayments(this.student.id),
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

  public onPaymentAdded(payment: StudentPayment) {
    this.payments.push(payment);
  }

  public onPaymentDeleted(paymentId: number): void {
    this.payments = this.payments.filter(it => it.id !== paymentId);
  }
}

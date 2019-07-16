import {Component} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student, StudentPayment, Teacher} from '../../../data';
import {LoginService, StudentsService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentPaymentHttp, TeachersHttp} from '../../../http';

@Component({
  selector: 'app-student-payment-page',
  templateUrl: './student-payment.page.html',
  styleUrls: ['./student-payment.page.less']
})
export class StudentPaymentPageComponent extends TranslatableComponent {
  public student: Student = new Student();
  public loadingInProgress = true;

  public payments: Array<StudentPayment> = [];
  public teachers: Array<Teacher> = [];

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsService: StudentsService,
    private studentPaymentHttp: StudentPaymentHttp,
    private teachersHttp: TeachersHttp,
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        this.student.id = Number(params.get('id'));

        Promise.all([
          this.studentsService.getStudent(this.student.id),
          this.studentPaymentHttp.getPayments(this.student.id),
          this.teachersHttp.getAllTeachers()
        ]).then(it => {
          this.student = it[0];
          this.payments = it[1];
          this.teachers = it[2];

          this.loadingInProgress = false;
        });
      });
    }
  }

  public onPaymentAdded(payment: StudentPayment) {
    this.payments.push(payment);
  }

  public onPaymentDeleted(paymentId: number): void {
    this.payments = this.payments.filter(it => it.id !== paymentId);
  }
}

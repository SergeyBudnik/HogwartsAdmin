import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StaffMember, ExistingStudentPayment} from '../../../../../../../data';
import {StudentPaymentHttp} from '../../../../../../../http';
import {NavigationService} from '../../../../../../../service';
import {PaymentProcessInfo} from '../../data/payment-process-info';

@Component({
  selector: 'app-student-card-payment-row',
  templateUrl: './student-card-payment-row.view.html',
  styleUrls: ['./student-card-payment-row.view.less']
})
export class StudentCardPaymentRowView {
  @Input() public payment: ExistingStudentPayment;
  @Input() public staffMembers: Array<StaffMember>;

  @Output() public paymentDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() public paymentProcessed: EventEmitter<PaymentProcessInfo> = new EventEmitter<PaymentProcessInfo>();

  public constructor(
    public navigationService: NavigationService,
    private studentPaymentHttp: StudentPaymentHttp
  ) {}

  public getStaffMember(): StaffMember {
    return this.staffMembers.find(it => it.login === this.payment.info.staffMemberLogin);
  }

  public processPayment(processed: boolean): void {
    this.studentPaymentHttp
      .processPayment(this.payment.id, processed)
      .then(() => {
        this.paymentProcessed.emit(new PaymentProcessInfo(this.payment.id, processed));
      });
  }

  public deletePayment(): void {
    this.studentPaymentHttp
      .deletePayment(this.payment.id)
      .then(() => {
        this.paymentDeleted.emit(this.payment.id);
      });
  }
}

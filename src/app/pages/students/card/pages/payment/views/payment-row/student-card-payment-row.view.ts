import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StaffMember, StudentPayment} from '../../../../../../../data';
import {StudentPaymentHttp} from '../../../../../../../http';
import {NavigationService} from '../../../../../../../service';

@Component({
  selector: 'app-student-card-payment-row',
  templateUrl: './student-card-payment-row.view.html',
  styleUrls: ['./student-card-payment-row.view.less']
})
export class StudentCardPaymentRowView {
  @Input() public payment: StudentPayment;
  @Input() public staffMembers: Array<StaffMember>;

  @Output() public paymentDeleted: EventEmitter<number> = new EventEmitter<number>();

  public constructor(
    public navigationService: NavigationService,
    private studentPaymentHttp: StudentPaymentHttp
  ) {}

  public getStaffMember(): StaffMember {
    return this.staffMembers.find(it => it.login === this.payment.staffMemberLogin);
  }

  public deletePayment(): void {
    this.studentPaymentHttp
      .deletePayment(this.payment.id)
      .then(() => {
        this.paymentDeleted.emit(this.payment.id);
      });
  }
}

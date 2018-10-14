import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../../translation/translation.component';
import {StudentPayment} from '../../../../data';
import {StudentPaymentHttp} from '../../../../http';

@Component({
  selector: '[app-student-payment-row]',
  templateUrl: './student-payment.row.html',
  styleUrls: ['./student-payment.row.less']
})
export class StudentPaymentRowComponent extends TranslatableComponent {
  @Input() public payment: StudentPayment;

  @Output() public paymentDeleted: EventEmitter<number> = new EventEmitter<number>();

  public actionInProgress = false;

  public constructor(
    private studentPaymentHttp: StudentPaymentHttp
  ) {
    super();
  }

  public deletePayment(): void {
    this.actionInProgress = true;

    this.studentPaymentHttp
      .deletePayment(this.payment.id)
      .then(() => {
        this.actionInProgress = false;

        this.paymentDeleted.emit(this.payment.id);
      });
  }
}

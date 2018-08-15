import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {StudentPayment} from '../../../data';
import {StudentPaymentService} from '../../../service';
import {IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-student-payment-modal',
  templateUrl: './student-payment.modal.html',
  styleUrls: ['./student-payment.modal.less']
})
export class StudentPaymentModal extends TranslatableComponent {
  @Output() public paymentAdded: EventEmitter<StudentPayment> = new EventEmitter<StudentPayment>();

  public modalVisible = true;

  public studentId;

  public date = {date: {year: 0, month: 0, day: 0}};
  public time: number;

  public loadingInProgress = true;
  public actionInProgress = false;

  public amountString: string = '';
  public amount: number = null;

  public constructor(
    private studentPaymentService: StudentPaymentService
  ) {
    super();

    const date: Date = new Date();

    this.date.date.year = date.getFullYear();
    this.date.date.month = date.getMonth() + 1;
    this.date.date.day = date.getDate();

    this.time = this.getTime(this.date);
  }

  @Input('studentId') public set setStudentId(studentId: number) {
    if (!!studentId) {
      this.studentId = studentId;
    }
  }

  public onAmountChange(amountString: string): void {
    this.amountString = amountString;

    const amount = Number.parseInt(amountString);

    if (!!amount && amount > 0) {
      this.amount = amount;
    } else {
      this.amount = null;
    }
  }

  public onDateChange(event: IMyDateModel): void {
    this.time = this.getTime(event);
  }

  public addPayment(): void {
    this.actionInProgress = true;

    this.studentPaymentService.addPayment(
      this.studentId,
      this.amount,
      this.time
    ).then(paymentId => {
      this.paymentAdded.emit(new StudentPayment(paymentId, this.studentId, this.amount, this.time));

      this.hideModal();

      this.actionInProgress = false;
    });
  }

  public close(): void {
    this.hideModal();
  }

  private hideModal(): void {
    this.modalVisible = !this.modalVisible;
  }

  private getTime(event: any): number {
    return new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day,
      0, 0, 0, 0
    ).getTime();
  }
}

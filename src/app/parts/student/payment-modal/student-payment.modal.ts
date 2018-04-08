import {Component, Input} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Student} from '../../../data';
import {StudentActionsService, StudentsService} from '../../../service';
import {IMyDateModel} from 'mydatepicker';
import {StringReference} from '../../../controls/string-reference';

@Component({
  selector: 'app-student-payment-modal',
  templateUrl: './student-payment.modal.html',
  styleUrls: ['./student-payment.modal.less']
})
export class StudentPaymentModal extends TranslatableComponent {
  public studentId;

  public date = {date: {year: 0, month: 0, day: 0}};
  public time: number;

  public loadingInProgress = true;
  public actionInProgress = false;

  private amountString: string;

  public amount: number = null;
  public amountReference = new StringReference(this.amountString);

  public constructor(
    private studentsService: StudentsService,
    private studentActionsService: StudentActionsService
  ) {
    super();

    const date: Date = new Date();

    this.date.date.year = date.getFullYear();
    this.date.date.month = date.getMonth() + 1;
    this.date.date.day = date.getDate();
  }

  @Input('studentId') public set setStudentId(studentId: number) {
    if (!!studentId) {
      this.studentId = studentId;

      Promise.all([
        this.studentsService.getStudent(this.studentId)
      ]).then(it => {
        const student: Student = it[0];

        this.loadingInProgress = false;
      })
    }
  }

  public onAmountChange(amountString: string): void {
    const amount = Number.parseInt(amountString);

    if (!!amount && amount > 0) {
      this.amount = amount;
    } else {
      this.amount = null;
    }
  }

  public onDateChange(event: IMyDateModel): void {
    this.time = new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day,
      0, 0, 0, 0
    ).getTime();
  }

  public addPayment(): void {
    this.actionInProgress = true;

    this.studentActionsService.addPayment(
      this.studentId,
      this.amount,
      this.time
    ).then(() => {
      this.actionInProgress = false;
    })
  }
}

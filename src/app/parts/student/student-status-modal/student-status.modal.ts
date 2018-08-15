import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {StudentPayment, StudentStatusType} from '../../../data';
import {StudentStatusService} from '../../../service';
import {IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-student-status-modal',
  templateUrl: './student-status.modal.html',
  styleUrls: ['./student-status.modal.less']
})
export class StudentStatusModal extends TranslatableComponent {
  @Output() public statusSaved: EventEmitter<void> = new EventEmitter<void>();

  public modalVisible = true;

  public studentId: number;
  public previousStatus: StudentStatusType;
  public newStatus: StudentStatusType;
  public hasAction: boolean;

  public date = {date: {year: 0, month: 0, day: 0}};
  public time: number;

  public loadingInProgress = true;
  public actionInProgress = false;

  public constructor(
    private studentStatusService: StudentStatusService
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

  @Input('previousStatus') public set setPreviousState(previousStatus: StudentStatusType) {
    if (!!previousStatus) {
      this.previousStatus = previousStatus;
    }
  }

  @Input('newStatus') public set setNewStatus(newStatus: StudentStatusType) {
    if (!!newStatus) {
      this.newStatus = newStatus;
    }
  }

  @Input('hasAction') public set setHasAction(hasAction: boolean) {
    if (hasAction) {
      this.hasAction = hasAction;
    }
  }

  public onDateChange(event: IMyDateModel): void {
    this.time = this.getTime(event);
  }

  public close(): void {
    this.hideModal();
  }

  public changeStudentStatus() {
    this.actionInProgress = true;

    this.studentStatusService
      .changeStudentStatus(this.studentId, this.newStatus, this.time)
      .then(() => {
        this.actionInProgress = false;

        this.statusSaved.emit(null);
        this.close();
      });
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

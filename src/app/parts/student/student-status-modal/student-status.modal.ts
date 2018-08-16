import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {StudentStatus, StudentStatusType, Time, TimeUtils} from '../../../data';
import {StudentStatusService} from '../../../service';
import {IMyDateModel} from 'mydatepicker';
import {SelectItem} from '../../../controls/select-item';

@Component({
  selector: 'app-student-status-modal',
  templateUrl: './student-status.modal.html',
  styleUrls: ['./student-status.modal.less']
})
export class StudentStatusModal extends TranslatableComponent {
  @Output() public statusSaved: EventEmitter<StudentStatus> = new EventEmitter<StudentStatus>();

  public modalVisible = true;

  public studentId: number;
  public previousStatus: StudentStatusType;
  public newStatus: StudentStatusType;
  public hasAction: boolean;

  public date = {date: {year: 0, month: 0, day: 0}};
  public actionTime: Time = 'T_08_00';

  public actionDateTime: number;

  public loadingInProgress = true;
  public actionInProgress = false;

  public actionTimeItems = TimeUtils.values.map(it => new SelectItem(
      this.getTimeTranslation(it), it
  ));

  public constructor(
    private studentStatusService: StudentStatusService
  ) {
    super();

    const date: Date = new Date();

    this.date.date.year = date.getFullYear();
    this.date.date.month = date.getMonth() + 1;
    this.date.date.day = date.getDate();

    this.actionDateTime = this.getTime(this.date);
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
    this.hasAction = hasAction;
  }

  public onDateChange(event: IMyDateModel): void {
    this.actionDateTime = this.getTime(event);
  }

  public close(): void {
    this.hideModal();
  }

  public changeStudentStatus() {
    this.actionInProgress = true;

    let totalActionTimeValue = this.actionDateTime + TimeUtils.getTimeMills(this.actionTime);

    this.studentStatusService
      .changeStudentStatus(this.studentId, this.newStatus, totalActionTimeValue)
      .then(() => {
        this.actionInProgress = false;
        // ToDo: fix id
        this.statusSaved.emit(new StudentStatus(null, this.studentId, this.newStatus, new Date().getTime(), totalActionTimeValue));
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

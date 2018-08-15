import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../translation/translation.component';
import {StudentAttendance, StudentAttendanceType, StudentAttendanceTypeUtils} from '../../../data';
import {StudentAttendanceService} from '../../../service';
import {IMyDateModel} from 'mydatepicker';
import {SelectItem} from '../../../controls/select-item';

@Component({
  selector: 'app-student-attendance-modal',
  templateUrl: './student-attendance.modal.html',
  styleUrls: ['./student-attendance.modal.less']
})
export class StudentAttendanceModal extends TranslatableComponent {
  @Output() public attendanceAdded: EventEmitter<StudentAttendance> = new EventEmitter<StudentAttendance>();

  public modalVisible = true;

  public studentId;

  public date = {date: {year: 0, month: 0, day: 0}};

  public loadingInProgress = true;
  public actionInProgress = false;

  public attendanceType: StudentAttendanceType = 'VISITED';
  private time: number;

  public constructor(
    private studentAttendanceService: StudentAttendanceService
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

  public onDateChange(event: IMyDateModel): void {
    this.time = this.getTime(event);
  }

  public addAttendance(): void {
    this.actionInProgress = true;

    this.studentAttendanceService.addAttendance(
      this.studentId,
      this.attendanceType,
      this.time
    ).then(attendanceId => {
      this.attendanceAdded.emit(new StudentAttendance(attendanceId, this.studentId, this.attendanceType, this.time));

      this.hideModal();

      this.actionInProgress = false;
    });
  }

  public close(): void {
    this.hideModal();
  }

  public getAttendanceTypeItems(): Array<SelectItem> {
    return StudentAttendanceTypeUtils
      .values
      .map(it => new SelectItem(this.getStudentAttendanceTypeTranslation(it), it));
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

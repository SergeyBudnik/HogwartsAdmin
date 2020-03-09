import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IMyDateModel} from 'mydatepicker';
import {StudentAttendance, StudentAttendanceType, StudentAttendanceTypeUtils} from '../../../../../../../data';
import {TranslationService} from '../../../../../../../service';
import {StudentAttendanceHttp} from '../../../../../../../http';
import {SelectItem} from '../../../../../../../controls/select-item';

@Component({
  selector: 'app-student-attendance-add-popup',
  templateUrl: './student-card-attendance-add-popup.view.html',
  styleUrls: ['./student-card-attendance-add-popup.view.less']
})
export class StudentCardAttendanceAddPopupView {
  @Output() public attendanceAdded: EventEmitter<StudentAttendance> = new EventEmitter<StudentAttendance>();

  public modalVisible = true;

  public studentId;

  public date = {date: {year: 0, month: 0, day: 0}};

  public loadingInProgress = true;
  public actionInProgress = false;

  public attendanceType: StudentAttendanceType = 'VISITED';
  private time: number;

  public constructor(
    private translationService: TranslationService,
    private studentAttendanceHttp: StudentAttendanceHttp
  ) {
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

    this.studentAttendanceHttp.addAttendance(
      this.studentId,
      this.attendanceType,
      this.time
    ).then(attendanceId => {
      this.attendanceAdded.emit(new StudentAttendance(attendanceId, this.studentId, this.attendanceType, this.time, this.time)); // TODO

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
      .map(it => new SelectItem(this.translationService.studentAttendanceType().translate(it), it));
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

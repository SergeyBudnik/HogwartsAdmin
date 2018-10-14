import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../../translation/translation.component';
import {StudentAttendance} from '../../../../data';
import {StudentAttendanceHttp} from '../../../../http';

@Component({
  selector: '[app-student-attendance-row]',
  templateUrl: './student-attendance.row.html',
  styleUrls: ['./student-attendance.row.less']
})
export class StudentAttendanceRowComponent extends TranslatableComponent {
  @Input() public attendance: StudentAttendance;

  @Output() public attendanceDeleted: EventEmitter<number> = new EventEmitter<number>();

  public actionInProgress = false;

  public constructor(
    private studentAttendanceHttp: StudentAttendanceHttp
  ) {
    super();
  }

  public deleteAttendance(): void {
    this.actionInProgress = true;

    this.studentAttendanceHttp
      .deleteAttendance(this.attendance.id)
      .then(() => {
        this.actionInProgress = false;

        this.attendanceDeleted.emit(this.attendance.id);
      });
  }
}

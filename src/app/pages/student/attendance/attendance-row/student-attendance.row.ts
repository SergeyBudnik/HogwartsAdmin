import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatableComponent} from '../../../../translation/translation.component';
import {StudentAttendance, StudentPayment} from '../../../../data';
import {StudentAttendanceService, StudentPaymentService} from '../../../../service';

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
    private studentAttendanceService: StudentAttendanceService
  ) {
    super();
  }

  public deleteAttendance(): void {
    this.actionInProgress = true;

    this.studentAttendanceService
      .deleteAttendance(this.attendance.id)
      .then(() => {
        this.actionInProgress = false;

        this.attendanceDeleted.emit(this.attendance.id);
      });
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentAttendance} from '../../../../data';
import {StudentAttendanceHttp} from '../../../../http';
import {TranslationService} from '../../../../service';

@Component({
  selector: '[app-student-attendance-row]',
  templateUrl: './student-attendance.row.html',
  styleUrls: ['./student-attendance.row.less']
})
export class StudentAttendanceRowComponent {
  @Input() public attendance: StudentAttendance;

  @Output() public attendanceDeleted: EventEmitter<number> = new EventEmitter<number>();

  public actionInProgress = false;

  public constructor(
    public translationService: TranslationService,
    private studentAttendanceHttp: StudentAttendanceHttp
  ) {}

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

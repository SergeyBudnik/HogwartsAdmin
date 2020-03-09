import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentAttendance} from '../../../../../../../data';
import {StudentAttendanceHttp} from '../../../../../../../http';
import {TranslationService} from '../../../../../../../service';

@Component({
  selector: 'app-student-card-attendance-row',
  templateUrl: './student-card-attendance-row.view.html',
  styleUrls: ['./student-card-attendance-row.view.less']
})
export class StudentCardAttendanceRowView {
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

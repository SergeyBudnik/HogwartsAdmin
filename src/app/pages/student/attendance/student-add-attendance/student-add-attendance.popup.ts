import {Component, Input} from '@angular/core';
import {TranslatableComponent} from '../../../../translation/translation.component';
import {DayOfWeek, DayOfWeekUtils, Group, Lesson, Student} from '../../../../data';
import {StudentAttendanceType, StudentAttendanceTypeUtils} from '../../../../data/student-attendance';
import {GroupsService, StudentsService} from '../../../../service';
import {IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-student-add-attendance-popup',
  templateUrl: './student-add-attendance.popup.html',
  styleUrls: ['./student-add-attendance.popup.less']
})
export class StudentAddAttendancePopup extends TranslatableComponent {
  public attendanceTypes: Array<StudentAttendanceType> = StudentAttendanceTypeUtils.values;

  public studentId;

  public date = {date: {year: 0, month: 0, day: 0}};
  public time: number;
  public type: StudentAttendanceType = 'VISIT';

  public lessons: Map<DayOfWeek, Array<Lesson>> = new Map<DayOfWeek, Array<Lesson>>();

  public currentLessons: Array<Lesson> = [];
  public currentLessonId: number = null;

  public loadingInProgress = true;
  public actionInProgress = false;

  public constructor(
    private studentsService: StudentsService,
    private groupsService: GroupsService,
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
        this.studentsService.getStudent(this.studentId),
        this.groupsService.getAllGroups()
      ]).then(it => {
        const student: Student = it[0];
        const groups: Array<Group> = it[1];

        const studentGroups: Array<Group> = groups
          .filter(group => student.groupIds.find(groupId => groupId === group.id));

        DayOfWeekUtils.values.forEach(dayOfWeek => this.lessons.set(dayOfWeek, []));

        studentGroups.forEach(group =>
          group.lessons.forEach(lesson => {
            this.lessons.get(lesson.day).push(lesson);
          })
        );

        this.loadingInProgress = false;
      })
    }
  }

  public onDateChange(event: IMyDateModel): void {
    const day = new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day,
      0, 0, 0, 0
    ).getDay();

    const currentDay = DayOfWeekUtils.values[day === 0 ? 6 : day - 1];

    this.currentLessons = this.lessons.get(currentDay);
    this.currentLessonId = this.currentLessons.length === 0 ? null : this.currentLessons[0].id;
  }
}

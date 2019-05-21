import {Component, Input, OnInit} from '@angular/core';
import {Lesson, Cabinet, DayOfWeek, DayOfWeekUtils, Time, TimeUtils, Teacher, Group} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp, TeachersHttp} from '../../../http';
import {SelectItem} from '../../../controls/select-item';

@Component({
  selector: 'app-assign-lesson-popup',
  templateUrl: './assign-lesson.popup.html',
  styleUrls: ['./assign-lesson.popup.less']
})
export class AssignLessonPopupComponent extends TranslatableComponent implements OnInit {
  public daysOfWeekItems: Array<SelectItem> = DayOfWeekUtils.values.map(it => new SelectItem(this.getDayOfWeekTranslation(it), it));
  public timesItems: Array<SelectItem> = TimeUtils.values.map(it => new SelectItem(this.getTimeTranslation(it), it));

  @Input() public group: Group;

  public lesson: Lesson = new Lesson(null, null, null, null, null, null, null);
  public cabinets: Array<Cabinet> = [];
  public teachers: Array<Teacher> = [];

  public constructor(
    private cabinetsHttp: CabinetsHttp,
    private teachersHttp: TeachersHttp
  ) {
    super();

    Promise.all([
      this.cabinetsHttp.getAllCabinets(),
      this.teachersHttp.getAllTeachers()
    ]).then(it => {
      this.cabinets = it[0];
      this.teachers = it[1];
    });
  }

  ngOnInit(): void {
    this.lesson = new Lesson(null, null, null, null, null, null, null);
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.teachers.map(it => new SelectItem(it.name, "" + it.id));
  }

  public onStartTimeChange() {
    const startTimeIndex = TimeUtils.index(this.lesson.startTime);
    const finishTimeIndex = startTimeIndex + 3 >= TimeUtils.values.length ? TimeUtils.values.length - 1 : startTimeIndex + 3;

    this.lesson.finishTime = TimeUtils.values[finishTimeIndex];
  }

  public save(): void {
    this.group.lessons.push(this.lesson);

    this.lesson.teacherId = Number(this.lesson.teacherId);

    this.lesson = new Lesson(null, null, null, null, null, null, null);
  }
}

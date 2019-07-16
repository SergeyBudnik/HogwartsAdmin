import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lesson, Cabinet, DayOfWeekUtils, TimeUtils, Teacher} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {CabinetsHttp, TeachersHttp} from '../../../http';
import {SelectItem} from '../../../controls/select-item';

export class LessonInfo {
  constructor(public lessonIndex: number, public lesson: Lesson) {}
}

@Component({
  selector: 'app-assign-lesson-popup',
  templateUrl: './assign-lesson.popup.html',
  styleUrls: ['./assign-lesson.popup.less']
})
export class AssignLessonPopupComponent extends TranslatableComponent {
  public daysOfWeekItems: Array<SelectItem> = DayOfWeekUtils.values.map(it => new SelectItem(this.getDayOfWeekTranslation(it), it));
  public timesItems: Array<SelectItem> = TimeUtils.values.map(it => new SelectItem(this.getTimeTranslation(it), it));
  public modalVisible = true;

  public lessonStatuses = [
    new SelectItem('Активно', 'ENABLED'),
    new SelectItem('Выключено', 'DISABLED')
  ];

  @Input('lessonInfo') set setLessonInfo(lessonInfo: LessonInfo) {
    this.lessonInfo = lessonInfo;

    if (this.lessonInfo.lesson.deactivationTime == null) {
      this.lessonStatus = 'ENABLED';
    } else {
      this.lessonStatus = 'DISABLED';
    }
  }

  @Output() public lessonInfoSaved: EventEmitter<LessonInfo> = new EventEmitter<LessonInfo>();

  public lessonInfo: LessonInfo = new LessonInfo(null, new Lesson());
  public lessonStatus: String = 'DISABLED';

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

  public getTeachersItems(): Array<SelectItem> {
    return this.teachers.map(it => new SelectItem(it.name, "" + it.id));
  }

  public save(): void {
    this.lessonInfo.lesson.teacherId = Number(this.lessonInfo.lesson.teacherId);

    if (this.lessonStatus == 'ENABLED') {
      this.lessonInfo.lesson.deactivationTime = null;
    }

    this.lessonInfoSaved.emit(this.lessonInfo);

    this.hideModal();
  }

  public cancel(): void {
    this.hideModal();
  }

  private hideModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}

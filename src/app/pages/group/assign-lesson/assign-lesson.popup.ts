import {Component, Input} from '@angular/core';
import {Lesson, Cabinet, DayOfWeekUtils, TimeUtils, Teacher} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';
import {SelectItem} from '../../../controls/select-item';

export class GroupAssignLessonPopupManager {
  private static popup: AssignLessonPopupComponent = null;
  private static saveListener: (lesson: Lesson) => void;
  private static deleteListener: () => void;

  public static register(popup: AssignLessonPopupComponent) {
    this.popup = popup;
  }

  public static pushGroupLesson(
    lesson: Lesson,
    lessonIndex: number,
    saveListener: (lesson: Lesson) => void,
    deleteListener: () => void
  ) {
    if (!!this.popup) {
      this.popup.onGroupLessonInit(lesson, lessonIndex);

      this.saveListener = saveListener;
      this.deleteListener = deleteListener;
    }
  }

  public static notifyGroupLessonSaved(lesson: Lesson) {
    if (this.popup != null && this.saveListener != null) {
      this.saveListener(lesson);
    }
  }

  public static notifyGroupLessonDeleted() {
    if (this.popup != null && this.deleteListener != null) {
      this.deleteListener();
    }
  }
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

  public lesson: Lesson = null;
  public lessonIndex: number = null;
  public lessonStatus: String = 'DISABLED';

  @Input() public cabinets: Array<Cabinet> = [];
  @Input() public teachers: Array<Teacher> = [];

  public constructor() {
    super();

    GroupAssignLessonPopupManager.register(this);
  }

  public onGroupLessonInit(lesson: Lesson, lessonIndex: number) {
    this.lesson = Lesson.copy(lesson);
    this.lessonIndex = lessonIndex;
    this.lessonStatus = (lesson.deactivationTime == null) ? 'ENABLED' : 'DISABLED';
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.teachers.map(it => new SelectItem(it.name, '' + it.id));
  }

  public isValid(): boolean {
    let hasTeacherId = !!this.lesson.teacherId;
    let hasDay = !!this.lesson.day;
    let hasStartTime = !!this.lesson.startTime;
    let hasFinishTime = !!this.lesson.finishTime;
    let hasCreationTime = !!this.lesson.creationTime;
    let hasDeactivationTime = !!this.lesson.deactivationTime;

    let isEnabled = (this.lessonStatus == 'ENABLED');

    return hasTeacherId && hasDay && hasStartTime && hasFinishTime && hasCreationTime && (isEnabled || hasDeactivationTime);
  }

  public isNew(): boolean {
    return this.lessonIndex == null;
  }

  public save(): void {
    this.lesson.teacherId = Number(this.lesson.teacherId);

    if (this.lessonStatus == 'ENABLED') {
      this.lesson.deactivationTime = null;
    }

    GroupAssignLessonPopupManager.notifyGroupLessonSaved(
      Lesson.copy(this.lesson)
    );

    this.toggleModal();
  }

  public delete() {
    GroupAssignLessonPopupManager.notifyGroupLessonDeleted();

    this.toggleModal();
  }

  public cancel(): void {
    this.toggleModal();
  }

  private toggleModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}

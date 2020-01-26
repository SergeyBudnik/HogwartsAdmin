import {Component, Input} from '@angular/core';
import {Lesson, Cabinet, DayOfWeekUtils, TimeUtils, StaffMember} from '../../../../../../../data';
import {SelectItem} from '../../../../../../../controls/select-item';
import {TranslationService} from '../../../../../../../service';

export class GroupCardInformationAssignLessonPopupManager {
  private static popup: GroupCardInformationAssignLessonPopup = null;
  private static saveListener: (lesson: Lesson) => void;
  private static deleteListener: () => void;

  public static register(popup: GroupCardInformationAssignLessonPopup) {
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
  selector: 'app-group-card-information-assign-lesson-popup',
  templateUrl: './group-card-information-assign-lesson.popup.html',
  styleUrls: ['./group-card-information-assign-lesson.popup.less']
})
export class GroupCardInformationAssignLessonPopup {
  public daysOfWeekItems: Array<SelectItem> = [];
  public timesItems: Array<SelectItem> = [];
  public modalVisible = true;

  public lessonStatuses = [
    new SelectItem('Активно', 'ENABLED'),
    new SelectItem('Выключено', 'DISABLED')
  ];

  public lesson: Lesson = null;
  public lessonIndex: number = null;
  public lessonStatus: String = 'DISABLED';

  @Input('cabinets') public cabinets: Array<Cabinet> = [];
  @Input('staffMembers') public staffMembers: Array<StaffMember> = [];

  public constructor(private translationService: TranslationService) {
    this.timesItems = TimeUtils.values.map(it => new SelectItem(
      this.translationService.time().translate(it),
      it
    ));

    this.daysOfWeekItems = DayOfWeekUtils.values.map(it => new SelectItem(
      this.translationService.dayOfWeek().translate(it),
      it
    ));

    GroupCardInformationAssignLessonPopupManager.register(this);
  }

  public onGroupLessonInit(lesson: Lesson, lessonIndex: number) {
    this.lesson = Lesson.copy(lesson);
    this.lessonIndex = lessonIndex;
    this.lessonStatus = (lesson.deactivationTime == null) ? 'ENABLED' : 'DISABLED';
  }

  public getStaffMembersItems(): Array<SelectItem> {
    return this.staffMembers.map(it => new SelectItem(it.person.name, it.login));
  }

  public isValid(): boolean {
    let hasTeacherLogin = !!this.lesson.teacherLogin;
    let hasDay = !!this.lesson.day;
    let hasStartTime = !!this.lesson.startTime;
    let hasFinishTime = !!this.lesson.finishTime;
    let hasCreationTime = !!this.lesson.creationTime;
    let hasDeactivationTime = !!this.lesson.deactivationTime;

    let isEnabled = (this.lessonStatus == 'ENABLED');

    return hasTeacherLogin && hasDay && hasStartTime && hasFinishTime && hasCreationTime && (isEnabled || hasDeactivationTime);
  }

  public isNew(): boolean {
    return this.lessonIndex == null;
  }

  public save(): void {
    if (this.lessonStatus == 'ENABLED') {
      this.lesson.deactivationTime = null;
    }

    GroupCardInformationAssignLessonPopupManager.notifyGroupLessonSaved(
      Lesson.copy(this.lesson)
    );

    this.toggleModal();
  }

  public delete() {
    GroupCardInformationAssignLessonPopupManager.notifyGroupLessonDeleted();

    this.toggleModal();
  }

  public cancel(): void {
    this.toggleModal();
  }

  private toggleModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}

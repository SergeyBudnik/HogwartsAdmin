import {Component, Input} from '@angular/core';
import {Lesson, Cabinet, StaffMember, Time, TimeUtils, Group} from '../../../../../../../data';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';
import {GroupLessonInfo} from '../../data';

export class GroupCardInformationAssignLessonPopupManager {
  private static popup: GroupCardInformationAssignLessonPopupView = null;
  private static saveListener: (groupLessonInfo: GroupLessonInfo) => void;
  private static deleteListener: () => void;

  public static register(popup: GroupCardInformationAssignLessonPopupView) {
    this.popup = popup;
  }

  public static pushGroupLesson(
    group: Group,
    lesson: Lesson,
    lessonIndex: number,
    saveListener: (groupLessonInfo: GroupLessonInfo) => void,
    deleteListener: () => void
  ) {
    if (!!this.popup) {
      this.popup.onGroupLessonInit(group, lesson, lessonIndex);

      this.saveListener = saveListener;
      this.deleteListener = deleteListener;
    }
  }

  public static notifyGroupLessonSaved(groupLessonInfo: GroupLessonInfo) {
    if (this.popup != null && this.saveListener != null) {
      this.saveListener(groupLessonInfo);
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
  templateUrl: './group-card-information-assign-lesson-popup.view.html',
  styleUrls: ['./group-card-information-assign-lesson-popup.view.less']
})
export class GroupCardInformationAssignLessonPopupView {
  public group: Group = null;
  public lesson: Lesson = null;
  public lessonIndex: number = null;

  public modalStatus = new ModalStatus(false);

  @Input('cabinets') public cabinets: Array<Cabinet> = [];
  @Input('staffMembers') public staffMembers: Array<StaffMember> = [];

  public constructor() {
    GroupCardInformationAssignLessonPopupManager.register(this);
  }

  public onGroupLessonInit(group: Group, lesson: Lesson, lessonIndex: number) {
    this.group = group;
    this.lesson = Lesson.copy(lesson);
    this.lessonIndex = lessonIndex;

    this.modalStatus.visible = true;
  }

  public onStartTimeChanged(startTime: Time) {
    const finishTimeDelta = this.group.type === 'GROUP' ? 3 : 2;

    this.lesson.startTime = startTime;
    this.lesson.finishTime = TimeUtils.byIndex(TimeUtils.index(startTime) + finishTimeDelta);
  }

  public isValid(): boolean {
    let hasTeacherLogin = !!this.lesson.teacherLogin;
    let hasDay = !!this.lesson.day;
    let hasStartTime = !!this.lesson.startTime;
    let hasFinishTime = !!this.lesson.finishTime;
    let hasCreationTime = !!this.lesson.creationTime;
    let hasDeactivationTime = !!this.lesson.deactivationTime;

    return hasTeacherLogin && hasDay && hasStartTime && hasFinishTime && hasCreationTime && hasDeactivationTime;
  }

  public isNew(): boolean {
    return this.lessonIndex == null;
  }

  public save(): void {
    GroupCardInformationAssignLessonPopupManager.notifyGroupLessonSaved(
      new GroupLessonInfo(
        Lesson.copy(this.lesson),
        this.lessonIndex,
        null
      )
    );

    this.modalStatus.visible = false;
  }

  public delete() {
    GroupCardInformationAssignLessonPopupManager.notifyGroupLessonDeleted();

    this.modalStatus.visible = false;
  }

  public cancel(): void {
    this.modalStatus.visible = false;
  }
}

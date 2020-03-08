import {Component, Input} from '@angular/core';
import {Lesson, Cabinet, StaffMember} from '../../../../../../../data';
import {TranslationService} from '../../../../../../../service';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';

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
  public lesson: Lesson = null;
  public lessonIndex: number = null;

  public modalStatus = new ModalStatus(false);

  @Input('cabinets') public cabinets: Array<Cabinet> = [];
  @Input('staffMembers') public staffMembers: Array<StaffMember> = [];

  public constructor() {
    GroupCardInformationAssignLessonPopupManager.register(this);
  }

  public onGroupLessonInit(lesson: Lesson, lessonIndex: number) {
    this.lesson = Lesson.copy(lesson);
    this.lessonIndex = lessonIndex;

    this.modalStatus.visible = true;
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
      Lesson.copy(this.lesson)
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

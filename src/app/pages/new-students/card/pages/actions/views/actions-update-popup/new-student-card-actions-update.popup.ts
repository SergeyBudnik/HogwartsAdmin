import {
  ExistingStudentOnBoardingAction,
  NewStudentOnBoardingAction, StaffMember,
} from '../../../../../../../data';
import {Component, Input} from '@angular/core';
import {DateAndTime, DateAndTimeUtils} from '../../../../../../../data/date-and-time';
import {StudentOnBoardingHttp} from '../../../../../../../http';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';

export class NewStudentCardActionsUpdatePopupManager {
  private static popup: NewStudentCardActionsUpdatePopup = null;
  private static saveListener: (oldAction: ExistingStudentOnBoardingAction, newAction: NewStudentOnBoardingAction) => void = null;

  public static register(popup: NewStudentCardActionsUpdatePopup) {
    this.popup = popup;
  }

  public static showPopup(
    login: string,
    oldAction: ExistingStudentOnBoardingAction,
    saveListener: (oldAction: ExistingStudentOnBoardingAction, newAction: NewStudentOnBoardingAction) => void
  ) {
    if (!!this.popup) {
      this.popup.onInit(login, oldAction);

      this.saveListener = saveListener;
    }
  }

  public static notifySaved(oldAction: ExistingStudentOnBoardingAction, newAction: NewStudentOnBoardingAction) {
    if (this.popup != null && this.saveListener != null) {
      this.saveListener(oldAction, newAction);
    }
  }
}

@Component({
  selector: 'app-new-student-card-actions-update-popup',
  templateUrl: './new-student-card-actions-update.popup.html',
  styleUrls: ['./new-student-card-actions-update.popup.less']
})
export class NewStudentCardActionsUpdatePopup {
  @Input() public staffMembers: Array<StaffMember> = [];

  public modalStatus = new ModalStatus(false);

  public oldAction: ExistingStudentOnBoardingAction = null;
  public newAction: NewStudentOnBoardingAction = null;

  private login: string = null;

  public constructor(
    private studentOnBoardingHttp: StudentOnBoardingHttp
  ) {
    NewStudentCardActionsUpdatePopupManager.register(this);
  }

  public onInit(login: string, oldAction: ExistingStudentOnBoardingAction) {
    this.login = login;

    this.oldAction = oldAction;
    this.newAction = new NewStudentOnBoardingAction();

    this.modalStatus = new ModalStatus(true);
  }

  public getDateAndTime(time: number): DateAndTime {
    return DateAndTimeUtils.fromMilliseconds(time);
  }

  public fromDateAndTime(dateAndTime: DateAndTime): number {
    return DateAndTimeUtils.toMilliseconds(dateAndTime);
  }

  public save() {
    this.studentOnBoardingHttp
      .completeAction(this.login, this.newAction)
      .then(() => {
        this.hideModal();

        NewStudentCardActionsUpdatePopupManager.notifySaved(
          this.oldAction,
          this.newAction
        );
      });
  }

  public cancel() {
    this.hideModal();
  }

  private hideModal() {
    this.modalStatus.visible = false;
  }
}

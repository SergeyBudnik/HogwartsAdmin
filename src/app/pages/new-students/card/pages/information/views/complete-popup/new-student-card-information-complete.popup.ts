import {
  ExistingStudentOnBoardingAction,
  NewStudentOnBoardingAction, StudentOnBoardingResult, StudentOnBoardingType,
} from '../../../../../../../data';
import {Component, Input} from '@angular/core';
import {StudentOnBoardingHttp} from '../../../../../../../http';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';
import {SelectItem} from '../../../../../../../controls/select-item';
import {TranslationService} from '../../../../../../../service';

export class NewStudentCardInformationCompletePopupManager {
  private static popup: NewStudentCardInformationCompletePopup = null;

  public static register(popup: NewStudentCardInformationCompletePopup) {
    this.popup = popup;
  }

  public static showPopup(login: string, result: StudentOnBoardingResult) {
    if (!!this.popup) {
      this.popup.onInit(login, result);

      // this.saveListener = saveListener;
    }
  }

  public static notifySaved(oldAction: ExistingStudentOnBoardingAction, newAction: NewStudentOnBoardingAction) {
    // if (this.popup != null && this.saveListener != null) {
      // this.saveListener(oldAction, newAction);
    // }
  }
}

@Component({
  selector: 'app-new-student-card-information-complete-popup',
  templateUrl: './new-student-card-information-complete.popup.html',
  styleUrls: ['./new-student-card-information-complete.popup.less']
})
export class NewStudentCardInformationCompletePopup {
  public modalStatus = new ModalStatus(false);

  public login: string = '';
  public result = new StudentOnBoardingResult(
    'PROGRESS',
    ''
  );

  public constructor(
    private studentOnBoardingHttp: StudentOnBoardingHttp,
    private translationService: TranslationService
  ) {
    NewStudentCardInformationCompletePopupManager.register(this);
  }

  public onInit(login: string, result: StudentOnBoardingResult) {
    this.login = login;
    this.result = new StudentOnBoardingResult(
      result.type,
      result.comment
    );

    this.modalStatus = new ModalStatus(true);
  }

  public getStatusItems(): Array<SelectItem> {
    return [
      'ON_BOARDED',
      'CANCELED'
    ].map(it => new SelectItem(
        this.translationService.studentOnBoardingType().translate(it as StudentOnBoardingType),
        it
      )
    );
  }

  public save() {
    this.studentOnBoardingHttp
      .complete(this.login, this.result)
      .then(() => {
        this.hideModal();
      })
  }

  public cancel() {
    this.hideModal();
  }

  private hideModal() {
    this.modalStatus.visible = false;
  }
}

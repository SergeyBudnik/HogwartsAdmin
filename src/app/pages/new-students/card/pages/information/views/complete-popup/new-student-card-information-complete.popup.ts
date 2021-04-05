import {StudentOnBoardingResult, StudentOnBoardingType,} from '../../../../../../../data';
import {Component} from '@angular/core';
import {StudentOnBoardingHttp} from '../../../../../../../http';
import {ModalStatus} from '../../../../../../../templates/modal/modal.template';
import {SelectItem} from '../../../../../../../controls/select-item';
import {TranslationService} from '../../../../../../../service';

export class NewStudentCardInformationCompletePopupManager {
  private static popup: NewStudentCardInformationCompletePopup = null;
  private static saveListener: (StudentOnBoardingResult) => void = null;

  public static register(popup: NewStudentCardInformationCompletePopup) {
    this.popup = popup;
  }

  public static showPopup(login: string, saveListener: (StudentOnBoardingResult) => void) {
    if (!!this.popup) {
      this.popup.onInit(login);

      this.saveListener = saveListener;
    }
  }

  public static notifySaved(newResult: StudentOnBoardingResult) {
    if (this.popup != null && this.saveListener != null) {
      this.saveListener(newResult);
    }
  }
}

@Component({
  selector: 'app-new-student-card-information-complete-popup',
  templateUrl: './new-student-card-information-complete.popup.html',
  styleUrls: ['./new-student-card-information-complete.popup.less']
})
export class NewStudentCardInformationCompletePopup {
  public modalStatus = new ModalStatus(false);

  public login = '';

  public result = new StudentOnBoardingResult(
    'ON_BOARDED',
    'Вступил в группу'
  );

  public constructor(
    private studentOnBoardingHttp: StudentOnBoardingHttp,
    private translationService: TranslationService
  ) {
    NewStudentCardInformationCompletePopupManager.register(this);
  }

  public onInit(login: string) {
    this.login = login;

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
        NewStudentCardInformationCompletePopupManager.notifySaved(this.result);

        this.hideModal();
      });
  }

  public cancel() {
    this.hideModal();
  }

  private hideModal() {
    this.modalStatus.visible = false;
  }
}

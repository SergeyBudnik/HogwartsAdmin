import {Component} from '@angular/core';
import {StaffMembersHttp, StudentOnBoardingHttp} from '../../../../../http';
import {LoginService, NavigationService, TranslationService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {ExistingStudentOnBoarding, StaffMember, StudentOnBoardingResult} from '../../../../../data';
import {NewStudentCardInformationCompletePopupManager} from './views/complete-popup/new-student-card-information-complete.popup';

@Component({
  selector: 'app-new-student-card-information-page',
  templateUrl: './new-student-card-information.page.html',
  styleUrls: ['./new-student-card-information.page.less']
})
export class NewStudentCardInformationPage {
  public loadingInProgress = true;

  public studentOnBoarding: ExistingStudentOnBoarding = null;
  public staffMembers: Array<StaffMember> = [];

  constructor(
    public translationService: TranslationService,
    public navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private studentOnBoardingHttp: StudentOnBoardingHttp,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loadingInProgress = true;

    this.loginService.ifAuthenticated(() => {
      this.parseParams((login) => this.load(login));
    });
  }

  public isCompleted(): boolean {
    if (this.loadingInProgress) {
      return false;
    } else {
      return this.studentOnBoarding.result.type !== 'PROGRESS'
    }
  }

  public save() {
    this.loadingInProgress = true;

    this.studentOnBoardingHttp
      .update(this.studentOnBoarding.info.login, this.studentOnBoarding.info)
      .then(() => {
        this.loadingInProgress = false;
      });
  }

  public delete() {
    this.studentOnBoardingHttp
      .delete(this.studentOnBoarding.info.login)
      .then(() => {
        this.navigationService.newStudents().list().go();
      });
  }

  public complete() {
    NewStudentCardInformationCompletePopupManager.showPopup(
      this.studentOnBoarding.info.login,
      this.studentOnBoarding.result
    );
  }

  private parseParams(actions: (string) => void) {
    this.activatedRoute.paramMap.subscribe(params => {
      const login = params.get('login');

      actions(login);
    });
  }

  private load(login: string) {
    Promise.all([
      this.studentOnBoardingHttp.getByLogin(login),
      this.staffMembersHttp.getAllStaffMembers(),
    ]).then(it => {
      this.studentOnBoarding = it[0] as ExistingStudentOnBoarding;
      this.staffMembers = it[1] as Array<StaffMember>;

      this.loadingInProgress = false;
    });
  }
}

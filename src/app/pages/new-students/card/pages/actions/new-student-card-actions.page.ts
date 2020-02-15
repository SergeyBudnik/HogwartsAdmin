import {Component} from '@angular/core';
import {ExistingStudentOnBoarding, ExistingStudentOnBoardingAction, StaffMember} from '../../../../../data';
import {LoginService, NavigationService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {StaffMembersHttp, StudentOnBoardingHttp} from '../../../../../http';
import {NewStudentCardActionsUpdatePopupManager} from './views/actions-update/new-student-card-actions-update.popup';

@Component({
  selector: 'app-new-student-card-actions-page',
  templateUrl: './new-student-card-actions.page.html',
  styleUrls: ['./new-student-card-actions.page.less']
})
export class NewStudentCardActionsPage {
  public loadingInProgress = true;
  public studentOnBoarding: ExistingStudentOnBoarding = null;

  public currentAction: ExistingStudentOnBoardingAction = null;
  public finishedActions: Array<ExistingStudentOnBoardingAction> = [];

  public staffMembers: Array<StaffMember> = [];

  constructor(
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

  public updateCurrentAction(action: ExistingStudentOnBoardingAction) {
    NewStudentCardActionsUpdatePopupManager.showPopup(
      this.studentOnBoarding.info.login,
      action,
      () => {}
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
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.studentOnBoarding = it[0];
      this.staffMembers = it[1];

      this.currentAction = this.studentOnBoarding.actions.find(it => it.completionTime == null);

      this.finishedActions = this.studentOnBoarding.actions
        .filter(it => it.completionTime != null)
        .sort((o1, o2) => o1.completionTime - o2.completionTime);

      this.loadingInProgress = false;
    });
  }
}

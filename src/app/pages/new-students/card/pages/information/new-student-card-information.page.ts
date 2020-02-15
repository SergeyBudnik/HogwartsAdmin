import {Component} from '@angular/core';
import {StaffMembersHttp, StudentOnBoardingHttp} from '../../../../../http';
import {LoginService, NavigationService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {ExistingStudentOnBoarding, StaffMember} from '../../../../../data';

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
    public navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private studentOnBoardingHttp: StudentOnBoardingHttp,
    private staffMembersHttp: StaffMembersHttp,
  ) {
    this.loadingInProgress = true;

    this.loginService.ifAuthenticated(() => {
      this.parseParams((login) => this.load(login));
    });
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
      this.studentOnBoarding = it[0];
      this.staffMembers = it[1];

      this.loadingInProgress = false;
    });
  }
}

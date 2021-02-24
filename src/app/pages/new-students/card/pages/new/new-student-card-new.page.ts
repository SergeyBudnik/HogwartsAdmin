import {Component} from '@angular/core';
import {StaffMembersHttp, StudentOnBoardingHttp} from '../../../../../http';
import {LoginService, NavigationService} from '../../../../../service';
import {ActivatedRoute} from '@angular/router';
import {NewStudentOnBoarding, StaffMember} from '../../../../../data';
import {DateAndTime, DateAndTimeUtils} from '../../../../../data/date-and-time';

@Component({
  selector: 'app-new-student-card-new-page',
  templateUrl: './new-student-card-new.page.html',
  styleUrls: ['./new-student-card-new.page.less']
})
export class NewStudentCardNewPage {
  public loadingInProgress = true;

  public studentOnBoarding: NewStudentOnBoarding = null;
  public staffMembers: Array<StaffMember> = [];

  public actionDateAndTime: DateAndTime = new DateAndTime(0, 'T_08_00');

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private navigationService: NavigationService,
    private studentOnBoardingHttp: StudentOnBoardingHttp,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loadingInProgress = true;

    this.loginService.ifAuthenticated(() => {
      this.load()
    });
  }

  public onActionDateAndTimeChange(actionDateAndTime: DateAndTime) {
    this.actionDateAndTime = actionDateAndTime;
  }

  public save() {
    this.studentOnBoarding.action.info.actionTime = DateAndTimeUtils.toMilliseconds(this.actionDateAndTime);

    this.studentOnBoardingHttp
      .create(this.studentOnBoarding)
      .then(() => {
        this.navigationService.newStudents().card(this.studentOnBoarding.info.login).information().go();
      })
  }

  public getDateAndTime(time: number): DateAndTime {
    return DateAndTimeUtils.fromMilliseconds(time);
  }

  private load() {
    Promise.all([
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.studentOnBoarding = new NewStudentOnBoarding();
      this.staffMembers = it[0];

      this.loadingInProgress = false;
    });
  }
}

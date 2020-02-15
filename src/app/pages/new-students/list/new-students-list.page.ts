import {Component} from '@angular/core';
import {StaffMembersHttp, StudentOnBoardingHttp} from '../../../http';
import {LoginService, NavigationService, TranslationService} from '../../../service';
import {StaffMember, ExistingStudentOnBoarding} from '../../../data';

@Component({
  selector: 'app-new-students-list-page',
  templateUrl: './new-students-list.page.html',
  styleUrls: ['./new-students-list.page.less']
})
export class NewStudentsListPage {
  private allStudentOnBoardings: Array<ExistingStudentOnBoarding> = [];
  private allStaffMembers: Array<StaffMember> = [];

  constructor(
    public navigationService: NavigationService,
    public translationService: TranslationService,
    private loginService: LoginService,
    private studentOnBoardingHttp: StudentOnBoardingHttp,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.load();
    });
  }

  public getNewStudents(): Array<ExistingStudentOnBoarding> {
    return this.allStudentOnBoardings;
  }

  public getStaffMember(login: string): StaffMember {
    return this.allStaffMembers.find(it => it.login === login);
  }

  private load() {
    Promise.all([
      this.studentOnBoardingHttp.getAll(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.allStudentOnBoardings = it[0];
      this.allStaffMembers = it[1];
    });
  }
}

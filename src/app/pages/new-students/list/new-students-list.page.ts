import {Component} from '@angular/core';
import {StaffMembersHttp, StudentOnBoardingHttp} from '../../../http';
import {LoginService, NavigationService, TranslationService} from '../../../service';
import {StaffMember, ExistingStudentOnBoarding, StudentOnBoardingType} from '../../../data';

@Component({
  selector: 'app-new-students-list-page',
  templateUrl: './new-students-list.page.html',
  styleUrls: ['./new-students-list.page.less']
})
export class NewStudentsListPage {
  private allStudentOnBoardings: Array<ExistingStudentOnBoarding> = [];
  private allStaffMembers: Array<StaffMember> = [];

  private nameFilter = '';
  private managerLoginFilter: string = null;
  private statusFilter: StudentOnBoardingType = 'PROGRESS';

  public studentOnBoardings: Array<ExistingStudentOnBoarding> = [];

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

  public getAllStaffMembers(): Array<StaffMember> {
    return this.allStaffMembers;
  }

  public getStaffMember(login: string): StaffMember {
    return this.allStaffMembers.find(it => it.login === login);
  }

  public onFilterChange(
    nameFilter: string,
    managerLoginFilter: string,
    statusFilter: StudentOnBoardingType
  ) {
    this.nameFilter = nameFilter === undefined ? this.nameFilter : nameFilter;
    this.managerLoginFilter = managerLoginFilter === undefined ? this.managerLoginFilter : managerLoginFilter;
    this.statusFilter = statusFilter === undefined ? this.statusFilter : statusFilter;

    this.studentOnBoardings = this.getFilteredStudentsOnBoardings();
  }

  private load() {
    Promise.all([
      this.studentOnBoardingHttp.getAll(),
      this.staffMembersHttp.getAllStaffMembers()
    ]).then(it => {
      this.allStudentOnBoardings = it[0];
      this.allStaffMembers = it[1];

      this.studentOnBoardings = this.getFilteredStudentsOnBoardings();
    });
  }

  private getFilteredStudentsOnBoardings(): Array<ExistingStudentOnBoarding> {
    return this.allStudentOnBoardings
      .filter(it => {
        const nameMatches = it.info.person.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
        const phoneMatches = it.info.person.contacts.phones.filter(phone => phone.value.indexOf(this.nameFilter) !== -1).length !== 0;

        return nameMatches || phoneMatches;
      })
      .filter(it => this.managerLoginFilter === null || it.info.managerLogin === this.managerLoginFilter)
      .filter(it => !this.statusFilter || it.result.type === this.statusFilter)
      .sort((o1, o2) => {
        const oa1 = o1.actions;
        const oa2 = o2.actions;

        return oa2[oa2.length - 1].info.actionTime - oa1[oa1.length - 1].info.actionTime;
      });
  }
}

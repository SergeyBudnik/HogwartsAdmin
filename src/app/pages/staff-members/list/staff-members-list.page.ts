import {Component} from '@angular/core';
import {LoginService, NavigationService} from '../../../service';
import {StaffMember} from '../../../data';
import {StaffMembersHttp} from '../../../http';

@Component({
  selector: 'app-staff-members-list-page',
  templateUrl: './staff-members-list.page.html',
  styleUrls: ['./staff-members-list.page.less']
})
export class StaffMembersListPageComponent {
  public staffMembers: Array<StaffMember> = [];
  public loadingInProgress = true;

  private allStaffMembers: Array<StaffMember> = [];

  public constructor(
    private loginService: LoginService,
    private navigationService: NavigationService,
    private staffMembersHttp: StaffMembersHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      Promise.all([
        this.staffMembersHttp.getAllStaffMembers()
      ]).then(it => {
        this.allStaffMembers = it[0];

        this.staffMembers = this.getFilteredStaffMembers('');

        this.loadingInProgress = false;
      });
    });
  }

  public onSearchChange(staffMemberNameFilter: string) {
    this.staffMembers = this.getFilteredStaffMembers(staffMemberNameFilter);
  }

  public openStaffMemberPage(login: string) {
    this.navigationService.staffMembers().id(login).information().go();
  }

  public openNewStaffMemberPage() {
    this.navigationService.staffMembers().new().go();
  }

  private getFilteredStaffMembers(staffMemberNameFilter: string): Array<StaffMember> {
    return this.allStaffMembers
      .filter(it => it.person.name.toLowerCase().indexOf(staffMemberNameFilter.toLowerCase()) !== -1);
  }
}

import {Component} from '@angular/core';
import {LoginService} from '../../service';
import {StaffMember} from '../../data';
import {Router} from '@angular/router';
import {StaffMembersHttp} from '../../http/staff-members.http';

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
    private router: Router,
    private staffMembersHttp: StaffMembersHttp
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]).then();
    } else {
      Promise.all([
        this.staffMembersHttp.getAllStaffMembers()
      ]).then(it => {
        this.allStaffMembers = it[0];

        this.staffMembers = this.getFilteredStaffMembers('');

        this.loadingInProgress = false;
      });
    }
  }

  public onSearchChange(staffMemberNameFilter: string) {
    this.staffMembers = this.getFilteredStaffMembers(staffMemberNameFilter);
  }

  public openStaffMemberPage(login: String) {
    this.router.navigate([`/staff-members/${login}/information`]).then();
  }

  public openNewStaffMemberPage() {
    this.router.navigate([`/staff-members/new/information`]).then();
  }

  private getFilteredStaffMembers(staffMemberNameFilter: string): Array<StaffMember> {
    return this.allStaffMembers
      .filter(it => it.person.name.toLowerCase().indexOf(staffMemberNameFilter.toLowerCase()) !== -1);
  }
}

import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

type Tab = 'INFORMATION' | 'TIMETABLE';

@Component({
  selector: '[app-staff-member-menu]',
  templateUrl: './staff-member-card-menu.component.html',
  styleUrls: ['./staff-member-card-menu.component.less']
})
export class StaffMemberCardMenuComponent {
  @Input() public staffMemberLogin: string;
  @Input() public currentTab: Tab;

  public constructor(
    private router: Router
  ) {}

  public navigateTo(location: string): void {
    this.router.navigate([`/staff-members/${this.staffMemberLogin}/${location}`]).then();
  }
}

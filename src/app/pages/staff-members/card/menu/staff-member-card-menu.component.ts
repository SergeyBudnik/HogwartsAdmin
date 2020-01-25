import {Component, Input} from '@angular/core';
import {NavigationService} from '../../../../service';

type Tab = 'INFORMATION' | 'TIMETABLE';

@Component({
  selector: '[app-staff-member-menu]',
  templateUrl: './staff-member-card-menu.component.html',
  styleUrls: ['./staff-member-card-menu.component.less']
})
export class StaffMemberCardMenuComponent {
  @Input() public isNew: boolean;
  @Input() public staffMemberLogin: string;
  @Input() public currentTab: Tab;

  public constructor(public navigationService: NavigationService) {}
}

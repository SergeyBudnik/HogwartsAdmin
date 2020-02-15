import {Component, Input} from '@angular/core';
import {NavigationService} from '../../../../../service';

export type Tab = 'INFORMATION' | 'ACTIONS';

@Component({
  selector: '[app-new-student-card-menu]',
  templateUrl: './new-student-card-menu.component.html',
  styleUrls: ['./new-student-card-menu.component.less']
})
export class NewStudentCardMenuComponent {
  @Input() public currentTab: Tab = 'INFORMATION';
  @Input() public login: string = null;

  constructor(public navigationService: NavigationService) {}
}

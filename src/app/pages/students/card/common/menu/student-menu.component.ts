import {Component, Input} from '@angular/core';
import {NavigationService} from '../../../../../service';

type Tab = 'INFORMATION' | 'STATUS' | 'ATTENDANCE' | 'PAYMENT';

@Component({
  selector: '[app-student-menu]',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.less']
})
export class StudentMenuComponent {
  @Input() public studentLogin: string;
  @Input() public currentTab: Tab;

  public constructor(public navigationService: NavigationService) {}
}

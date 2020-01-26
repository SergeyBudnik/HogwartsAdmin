import {Component, Input} from '@angular/core';
import {NavigationService} from '../../../../../service';

type Tab = 'INFORMATION' | 'TIMETABLE';

@Component({
  selector: '[app-cabinet-card-menu]',
  templateUrl: './cabinet-card-menu.component.html',
  styleUrls: ['./cabinet-card-menu.component.less']
})
export class CabinetCardMenuComponent {
  @Input() public cabinetId: number;
  @Input() public currentTab: Tab;

  public constructor(public navigationService: NavigationService) {}
}

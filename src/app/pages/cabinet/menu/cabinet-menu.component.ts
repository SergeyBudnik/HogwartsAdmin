import {Component, Input} from '@angular/core';
import {NavigationService} from '../../../service';

type Tab = 'INFORMATION' | 'TIMETABLE';

@Component({
  selector: '[app-cabinet-menu]',
  templateUrl: './cabinet-menu.component.html',
  styleUrls: ['./cabinet-menu.component.less']
})
export class CabinetMenuPageComponent {
  @Input() public cabinetId: number;
  @Input() public currentTab: Tab;

  public constructor(public navigationService: NavigationService) {}
}

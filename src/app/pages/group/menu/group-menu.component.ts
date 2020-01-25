import {Component, Input} from '@angular/core';
import {NavigationService} from '../../../service';

type Tab = 'INFORMATION' | 'STUDENTS' | 'TIMETABLE';

@Component({
  selector: '[app-group-menu]',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.less']
})
export class GroupMenuPageComponent {
  @Input() public groupId: number;
  @Input() public currentTab: Tab;

  public constructor(public navigationService: NavigationService) {}
}

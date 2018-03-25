import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

type Tab = 'INFORMATION' | 'STUDENTS' | 'TIMETABLE';

@Component({
  selector: '[app-group-menu]',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.less']
})
export class GroupMenuPageComponent {
  @Input() public groupId: number;
  @Input() public currentTab: Tab;

  public constructor(
    private router: Router
  ) {}

  public navigateTo(location: string): void {
    this.router.navigate([`/groups/${this.groupId}/${location}`]);
  }
}

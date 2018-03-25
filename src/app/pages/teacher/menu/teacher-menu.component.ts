import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

type Tab = 'INFORMATION' | 'TIMETABLE' | 'ACCOUNT';

@Component({
  selector: '[app-teacher-menu]',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.less']
})
export class TeacherMenuPageComponent {
  @Input() public teacherId: number;
  @Input() public currentTab: Tab;

  public constructor(
    private router: Router
  ) {}

  public navigateTo(location: string): void {
    this.router.navigate([`/teachers/${this.teacherId}/${location}`]);
  }
}

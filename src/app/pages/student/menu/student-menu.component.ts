import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

type Tab = 'INFORMATION' | 'ATTENDANCE' | 'PAYMENT';

@Component({
  selector: '[app-student-menu]',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.less']
})
export class StudentMenuPageComponent {
  @Input() public studentId: number;
  @Input() public currentTab: Tab;

  public constructor(
    private router: Router
  ) {}

  public navigateTo(location: string): void {
    this.router.navigate([`/students/${this.studentId}/${location}`]);
  }
}

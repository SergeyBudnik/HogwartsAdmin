import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

type Tab = 'INFORMATION' | 'PARTICIPANTS';

@Component({
  selector: '[app-event-menu]',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.less']
})
export class EventMenuPageComponent {
  @Input() public eventId: number;
  @Input() public currentTab: Tab;

  public constructor(
    private router: Router
  ) {}

  public navigateTo(location: string): void {
    this.router.navigate([`/events/${this.eventId}/${location}`]);
  }
}

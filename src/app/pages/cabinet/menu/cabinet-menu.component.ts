import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

type Tab = 'INFORMATION' | 'TIMETABLE';

@Component({
  selector: '[app-cabinet-menu]',
  templateUrl: './cabinet-menu.component.html',
  styleUrls: ['./cabinet-menu.component.less']
})
export class CabinetMenuPageComponent {
  @Input() public cabinetId: number;
  @Input() public currentTab: Tab;

  public constructor(
    private router: Router
  ) {}

  public navigateTo(location: string): void {
    this.router.navigate([`/cabinets/${this.cabinetId}/${location}`]);
  }
}

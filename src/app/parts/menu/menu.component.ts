import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

export type Section = 'STUDENTS' | 'GROUPS' | 'TEACHERS' | 'CABINETS';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {
  @Input() public activeSection: Section;

  public constructor(
    private router: Router
  ) {}

  public navigate(target: string) {
    this.router.navigate([target]);
  }
}

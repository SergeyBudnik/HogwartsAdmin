import {Component, Input} from '@angular/core';
import {LoginService, NavigationService} from '../../service';

export type Section = 'STUDENTS' | 'GROUPS' | 'TEACHERS' | 'CABINETS' | 'STAFF_MEMBERS';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() public activeSection: Section;

  public constructor(
    public navigationService: NavigationService,
    private loginService: LoginService
  ) {}

  public logOff(): void {
    this.loginService.logOff();

    this.navigationService.login().go();
  }
}

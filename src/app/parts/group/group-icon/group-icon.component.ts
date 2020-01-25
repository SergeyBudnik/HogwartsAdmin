import {Component, Input} from '@angular/core';
import {Group} from '../../../data';
import {NavigationService} from '../../../service';

@Component({
  selector: '[app-group-icon]',
  templateUrl: './group-icon.component.html',
  styleUrls: ['./group-icon.component.less']
})
export class GroupIconComponent {
  @Input() public group: Group;

  public constructor(
    private navigationService: NavigationService
  ) {}

  public goToGroup() {
    this.navigationService.groups().id(this.group.id).information().go();
  }
}

import {Component, Input} from '@angular/core';
import {Group} from '../../../data';
import {Router} from '@angular/router';

@Component({
  selector: '[app-group-icon]',
  templateUrl: './group-icon.component.html',
  styleUrls: ['./group-icon.component.less']
})
export class GroupIconComponent {
  @Input() public group: Group;

  public constructor(
    private router: Router
  ) {}

  public goToGroup() {
    this.router.navigate([`/groups/${this.group.id}/information`]);
  }
}

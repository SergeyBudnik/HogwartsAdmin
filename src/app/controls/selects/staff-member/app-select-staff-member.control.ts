import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../select-item';
import {StaffMember} from '../../../data';

@Component({
  selector: 'app-select-staff-member-control',
  templateUrl: './app-select-staff-member.control.html',
  styleUrls: ['./app-select-staff-member.control.less']
})
export class AppSelectStaffMemberControl {
  public items: Array<SelectItem> = [];

  @Input('staffMemberLogin') public staffMemberLogin: string = null;

  @Input('items') set setStaffMembers(staffMembers: Array<StaffMember>) {
    this.items = staffMembers.map(it => new SelectItem(
      it.person.name,
      it.login
    ));
  }

  @Output('onChange') public emitter = new EventEmitter<string>();

  public onValueChanged(value: string) {
    this.emitter.emit(value);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupType, StaffMember} from '../../data';
import {SelectItem} from '../select-item';

@Component({
  selector: 'app-form-select-control-staff-member',
  templateUrl: './form-select.staff-member.control.html',
  styleUrls: ['./form-select.staff-member.control.less']
})
export class FormSelectStaffMemberControl {
  public items: Array<SelectItem> = [];

  @Input('label') public label: string = '';
  @Input('staffMemberLogin') public staffMemberLogin: string = null;

  @Input('staffMembers') set setStaffMembers(staffMembers: Array<StaffMember>) {
    this.items = staffMembers.map(it => new SelectItem(
      it.person.name,
      it.login
    ));
  }

  @Output('onValueChanged') public emitter = new EventEmitter<string>();

  public onValueChanged(value: GroupType) {
    this.emitter.emit(value);
  }
}

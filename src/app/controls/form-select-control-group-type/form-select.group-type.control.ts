import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupType, GroupTypeUtils} from '../../data';
import {SelectItem} from '../select-item';
import {TranslatableComponent} from '../../translation/translation.component';

@Component({
  selector: 'app-form-select-control-group-type',
  templateUrl: './form-select.group-type.control.html',
  styleUrls: ['./form-select.group-type.control.less']
})
export class FormSelectGroupTypeControl extends TranslatableComponent {
  public groupTypes = GroupTypeUtils.values.map(it => new SelectItem(this.getGroupTypeTranslation(it), it));

  @Input('groupType') public groupType: GroupType = null;
  @Output('onValueChanged') public emitter = new EventEmitter<GroupType>();

  public onValueChanged(value: GroupType) {
    this.emitter.emit(value);
  }
}

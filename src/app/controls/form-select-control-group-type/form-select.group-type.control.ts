import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupType, GroupTypeUtils} from '../../data';
import {SelectItem} from '../select-item';
import {TranslationService} from '../../service';

@Component({
  selector: 'app-form-select-control-group-type',
  templateUrl: './form-select.group-type.control.html',
  styleUrls: ['./form-select.group-type.control.less']
})
export class FormSelectGroupTypeControl {
  public groupTypes: Array<SelectItem> = [];

  @Input('groupType') public groupType: GroupType = null;
  @Output('onValueChanged') public emitter = new EventEmitter<GroupType>();

  constructor(private translationService: TranslationService) {
    this.groupTypes = GroupTypeUtils.values.map(it => new SelectItem(
      this.translationService.groupType().translate(it),
      it
    ));
  }

  public onValueChanged(value: GroupType) {
    this.emitter.emit(value);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GroupType, GroupTypeUtils} from '../../../data';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';

@Component({
  selector: 'app-select-group-type-control',
  templateUrl: './app-select-group-type.control.html',
  styleUrls: ['./app-select-group-type.control.less']
})
export class AppSelectGroupTypeControl {
  public items = [];

  @Input('value') public value: GroupType = null;
  @Output('onChange') public emitter = new EventEmitter<GroupType>();

  constructor(public translationService: TranslationService) {
    this.items = GroupTypeUtils.values.map(it => new SelectItem(this.translationService.groupType().translate(it), it));
  }

  public onValueChanged(value: GroupType) {
    this.emitter.emit(value);
  }
}

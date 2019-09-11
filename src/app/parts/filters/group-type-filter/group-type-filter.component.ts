import {Component, EventEmitter, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {GroupType, GroupTypeUtils} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';

@Component({
  selector: 'app-filter-group-type',
  templateUrl: './group-type-filter.component.html',
  styleUrls: ['./group-type-filter.component.less']
})
export class GroupTypeFilterComponent extends TranslatableComponent {
  @Output('onChange') public emitter: EventEmitter<GroupType> = new EventEmitter();

  public getItems(): Array<SelectItem> {
    let items = [new SelectItem('Все', '')];

    GroupTypeUtils.values.forEach(it => items.push(new SelectItem(this.getGroupTypeTranslation(it), it)));

    return items;
  }

  public onChange(value: GroupType) {
    this.emitter.emit(value);
  }
}

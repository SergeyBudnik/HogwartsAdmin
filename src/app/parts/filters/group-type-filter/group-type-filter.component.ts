import {Component, EventEmitter, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {GroupType, GroupTypeUtils} from '../../../data';
import {TranslationService} from '../../../service';

@Component({
  selector: 'app-filter-group-type',
  templateUrl: './group-type-filter.component.html',
  styleUrls: ['./group-type-filter.component.less']
})
export class GroupTypeFilterComponent {
  @Output('onChange') public emitter: EventEmitter<GroupType> = new EventEmitter();

  constructor(private translationService: TranslationService) {}

  public getItems(): Array<SelectItem> {
    let items = [new SelectItem('Все', '')];

    GroupTypeUtils.values.forEach(it => items.push(new SelectItem(
      this.translationService.groupType().translate(it),
      it
    )));

    return items;
  }

  public onChange(value: GroupType) {
    this.emitter.emit(value);
  }
}

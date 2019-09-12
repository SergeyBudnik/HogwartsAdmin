import {Component, EventEmitter, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {Age, AgeUtils} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';

@Component({
  selector: 'app-filter-age',
  templateUrl: './age-filter.component.html',
  styleUrls: ['./age-filter.component.less']
})
export class AgeFilterComponent extends TranslatableComponent {
  @Output('onChange') public emitter: EventEmitter<Age> = new EventEmitter();

  public getItems(): Array<SelectItem> {
    return AgeUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.getAgeTranslationAsGroup(it), it)
    );
  }

  public onChange(value: Age) {
    this.emitter.emit(value);
  }
}

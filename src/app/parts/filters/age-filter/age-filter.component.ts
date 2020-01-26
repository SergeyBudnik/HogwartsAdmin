import {Component, EventEmitter, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {Age, AgeUtils} from '../../../data';
import {TranslationService} from '../../../service';

@Component({
  selector: 'app-filter-age',
  templateUrl: './age-filter.component.html',
  styleUrls: ['./age-filter.component.less']
})
export class AgeFilterComponent {
  @Output('onChange') public emitter: EventEmitter<Age> = new EventEmitter();

  constructor(private translationService: TranslationService) {}

  public getItems(): Array<SelectItem> {
    return AgeUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.translationService.age().translate(it), it)
    );
  }

  public onChange(value: Age) {
    this.emitter.emit(value);
  }
}

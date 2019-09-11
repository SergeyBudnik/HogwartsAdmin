import {Component, EventEmitter, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {EducationLevel, EducationLevelUtils} from '../../../data';
import {TranslatableComponent} from '../../../translation/translation.component';

@Component({
  selector: 'app-filter-education-level',
  templateUrl: './education-level-filter.component.html',
  styleUrls: ['./education-level-filter.component.less']
})
export class EducationLevelFilterComponent extends TranslatableComponent {
  @Output('onChange') public emitter: EventEmitter<EducationLevel> = new EventEmitter();

  public getItems(): Array<SelectItem> {
    return EducationLevelUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.getEducationLevelTranslation(it), it)
    );
  }

  public onChange(value: EducationLevel) {
    this.emitter.emit(value);
  }
}

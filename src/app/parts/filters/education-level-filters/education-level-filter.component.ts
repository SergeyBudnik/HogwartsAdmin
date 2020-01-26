import {Component, EventEmitter, Output} from '@angular/core';
import {SelectItem} from '../../../controls/select-item';
import {EducationLevel, EducationLevelUtils} from '../../../data';
import {TranslationService} from '../../../service';

@Component({
  selector: 'app-filter-education-level',
  templateUrl: './education-level-filter.component.html',
  styleUrls: ['./education-level-filter.component.less']
})
export class EducationLevelFilterComponent {
  @Output('onChange') public emitter: EventEmitter<EducationLevel> = new EventEmitter();

  constructor(private translationService: TranslationService) {}

  public getItems(): Array<SelectItem> {
    return EducationLevelUtils.values.map(it =>
      new SelectItem(it === 'UNKNOWN' ? 'Все' : this.translationService.educationLevel().translate(it), it)
    );
  }

  public onChange(value: EducationLevel) {
    this.emitter.emit(value);
  }
}

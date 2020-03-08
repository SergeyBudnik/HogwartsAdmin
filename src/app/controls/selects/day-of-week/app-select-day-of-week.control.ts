import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DayOfWeek, DayOfWeekUtils} from '../../../data';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';

@Component({
  selector: 'app-select-day-of-week-control',
  templateUrl: './app-select-day-of-week.control.html',
  styleUrls: ['./app-select-day-of-week.control.less']
})
export class AppSelectDayOfWeekControl {
  public items = [];

  @Input('value') public value: DayOfWeek = null;
  @Output('onChange') public emitter = new EventEmitter<DayOfWeek>();

  constructor(public translationService: TranslationService) {
    this.items = DayOfWeekUtils.values.map(it => new SelectItem(this.translationService.dayOfWeek().translate(it), it));
  }

  public onValueChanged(value: DayOfWeek) {
    this.emitter.emit(value);
  }
}

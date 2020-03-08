import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Time, TimeUtils} from '../../../data';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';

@Component({
  selector: 'app-select-time-control',
  templateUrl: './app-select-time.control.html',
  styleUrls: ['./app-select-time.control.less']
})
export class AppSelectTimeControl {
  public items = [];

  @Input('value') public value: Time = null;
  @Output('onChange') public emitter = new EventEmitter<Time>();

  constructor(public translationService: TranslationService) {
    this.items = TimeUtils.values.map(it => new SelectItem(this.translationService.time().translate(it), it));
  }

  public onValueChanged(value: Time) {
    this.emitter.emit(value);
  }
}

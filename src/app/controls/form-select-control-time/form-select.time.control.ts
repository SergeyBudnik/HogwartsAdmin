import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Time, TimeUtils} from '../../data';
import {SelectItem} from '../select-item';
import {TranslationService} from '../../service';

@Component({
  selector: 'app-form-select-control-time',
  templateUrl: './form-select.time.control.html',
  styleUrls: ['./form-select.time.control.less']
})
export class FormSelectTimeControl {
  public items: Array<SelectItem> = [];

  @Input('label') public label: string = '';
  @Input('value') public value: Time = null;

  @Output('onValueChanged') public emitter = new EventEmitter<Time>();

  constructor(private translationService: TranslationService) {
    this.items = TimeUtils.values.map(it => new SelectItem(
      this.translationService.time().translate(it),
      it
    ));
  }

  public onValueChanged(value: Time) {
    this.emitter.emit(value);
  }
}

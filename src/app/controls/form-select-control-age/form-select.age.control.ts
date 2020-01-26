import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Age, AgeUtils} from '../../data';
import {SelectItem} from '../select-item';
import {TranslationService} from '../../service';

@Component({
  selector: 'app-form-select-control-age',
  templateUrl: './form-select.age.control.html',
  styleUrls: ['./form-select.age.control.less']
})
export class FormSelectAgeControl {
  public ages = [];

  @Input('age') public age: Age = null;
  @Output('onValueChanged') public emitter = new EventEmitter<Age>();

  constructor(public translationService: TranslationService) {
    this.ages = AgeUtils.values.map(it => new SelectItem(this.translationService.age().translate(it), it));
  }

  public onValueChanged(value: Age) {
    this.emitter.emit(value);
  }
}

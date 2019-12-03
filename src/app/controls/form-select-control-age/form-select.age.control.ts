import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Age, AgeUtils} from '../../data';
import {SelectItem} from '../select-item';
import {TranslatableComponent} from '../../translation/translation.component';

@Component({
  selector: 'app-form-select-control-age',
  templateUrl: './form-select.age.control.html',
  styleUrls: ['./form-select.age.control.less']
})
export class FormSelectAgeControl extends TranslatableComponent {
  public ages = AgeUtils.values.map(it => new SelectItem(this.getAgeTranslationAsGroup(it), it));

  @Input('age') public age: Age = null;
  @Output('onValueChanged') public emitter = new EventEmitter<Age>();

  public onValueChanged(value: Age) {
    this.emitter.emit(value);
  }
}

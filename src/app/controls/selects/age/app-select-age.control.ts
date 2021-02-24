import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Age, AgeUtils} from '../../../data';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';

@Component({
  selector: 'app-select-age-control',
  templateUrl: './app-select-age.control.html',
  styleUrls: ['./app-select-age.control.less']
})
export class AppSelectAgeControl {
  public items = [];

  @Input() public value: Age = null;
  @Input() public editable: boolean = true;

  @Output('onChange') public emitter = new EventEmitter<Age>();

  constructor(public translationService: TranslationService) {
    this.items = AgeUtils.values.map(it => new SelectItem(this.translationService.age().translate(it), it));
  }

  public onValueChanged(value: Age) {
    this.emitter.emit(value);
  }
}

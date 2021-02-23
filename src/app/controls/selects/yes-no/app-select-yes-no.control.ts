import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';
import {YesNo, YesNoUtils} from '../../../data/yes-no';

@Component({
  selector: 'app-select-yes-no-control',
  templateUrl: './app-select-yes-no.control.html',
  styleUrls: ['./app-select-yes-no.control.less']
})
export class AppSelectYesNoControl {
  public items = [];
  public yesNoValue: YesNo = 'NO';

  @Input('value') set setValue(value: Boolean) {
    this.yesNoValue = value ? 'YES' : 'NO'
  }

  @Output('onChange') public emitter = new EventEmitter<Boolean>();

  constructor(public translationService: TranslationService) {
    this.items = YesNoUtils.values.map(it => new SelectItem(this.translationService.yesNo().translate(it), it));
  }

  public onValueChanged(value: YesNo) {
    const booleanValue = (value === 'YES');

    this.emitter.emit(booleanValue);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EducationLevel, EducationLevelUtils} from '../../../data';
import {TranslationService} from '../../../service';
import {SelectItem} from '../../select-item';

@Component({
  selector: 'app-select-education-level-control',
  templateUrl: './app-select-education-level.control.html',
  styleUrls: ['./app-select-education-level.control.less']
})
export class AppSelectEducationLevelControl {
  public items = [];

  @Input('value') public value: EducationLevel = null;
  @Output('onChange') public emitter = new EventEmitter<EducationLevel>();

  constructor(public translationService: TranslationService) {
    this.items = EducationLevelUtils.values.map(it => new SelectItem(this.translationService.educationLevel().translate(it), it));
  }

  public onValueChanged(value: EducationLevel) {
    this.emitter.emit(value);
  }
}

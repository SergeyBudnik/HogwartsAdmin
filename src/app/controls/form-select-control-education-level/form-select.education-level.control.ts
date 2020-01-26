import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EducationLevel, EducationLevelUtils} from '../../data';
import {SelectItem} from '../select-item';
import {TranslationService} from '../../service';

@Component({
  selector: 'app-form-select-control-education-level',
  templateUrl: './form-select.education-level.control.html',
  styleUrls: ['./form-select.education-level.control.less']
})
export class FormSelectEducationLevelControl {
  public items: Array<SelectItem> = [];

  @Input('educationLevel') public educationLevel: EducationLevel = null;
  @Output('onValueChanged') public emitter = new EventEmitter<EducationLevel>();

  constructor(private translationService: TranslationService) {
    this.items = EducationLevelUtils.values.map(it => new SelectItem(
      this.translationService.educationLevel().translate(it),
      it
    ))
  }

  public onValueChanged(value: EducationLevel) {
    this.emitter.emit(value);
  }
}

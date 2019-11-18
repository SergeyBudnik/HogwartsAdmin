import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EducationLevel, EducationLevelDictionary} from '../../data';

@Component({
  selector: 'app-form-select-control-education-level',
  templateUrl: './form-select.education-level.control.html',
  styleUrls: ['./form-select.education-level.control.less']
})
export class FormSelectEducationLevelControl {
  public educationLevelDictionary = new EducationLevelDictionary();

  @Input('educationLevel') public educationLevel: EducationLevel = null;
  @Output('onValueChanged') public emitter = new EventEmitter<EducationLevel>();

  public onValueChanged(value: EducationLevel) {
    this.emitter.emit(value);
  }
}

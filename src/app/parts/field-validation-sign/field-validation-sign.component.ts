import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-field-validation-sign',
  templateUrl: './field-validation-sign.component.html',
  styleUrls: ['./field-validation-sign.component.less']
})
export class FieldValidationSignComponent {
  @Input() public valid: boolean;
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-input-control',
  templateUrl: './app-form-input.control.html',
  styleUrls: ['./app-form-input.control.less']
})
export class AppFormInputControl {
  @Input('label') public label: string = 'label';
  @Input('valid') public valid: boolean = true;
}

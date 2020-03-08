import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-color-picker-control',
  templateUrl: './app-color-picker.control.html',
  styleUrls: ['./app-color-picker.control.less']
})
export class AppColorPickerControl {
  @Input('value') value: string;
  @Output('onChange') onChange: EventEmitter<string> = new EventEmitter();

  public onValueChange(value: string) {
    this.value = value;

    this.onChange.emit(value);
  }
}

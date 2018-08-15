import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-form-text-input-control]',
  templateUrl: './form-text-input.control.html',
  styleUrls: ['./form-text-input.control.less']
})
export class FormTextControl {
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: String;
  @Input() valid: boolean;

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public onValueChange(value: string): void {
    this.value = value;

    this.onChange.emit(value);
  }
}

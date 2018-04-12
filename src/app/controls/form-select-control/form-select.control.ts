import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringReference} from '../string-reference';
import {SelectItem} from '../select-item';

@Component({
  selector: '[app-form-select-control]',
  templateUrl: './form-select.control.html',
  styleUrls: ['./form-select.control.less']
})
export class FormSelectControl {
  @Input() name: string;
  @Input() label: string;
  @Input() valueRef: StringReference = null;
  @Input() items: Array<SelectItem> = [];
  @Input() valid: boolean = false;

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public onValueChange(value: string) {
    this.valueRef.setValue(value);

    this.onChange.emit(value);
  }
}

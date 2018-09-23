import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../select-item';

export type FormSelectControlType = 'NUMERIC' | 'STRING';

@Component({
  selector: '[app-form-select-control]',
  templateUrl: './form-select.control.html',
  styleUrls: ['./form-select.control.less']
})
export class FormSelectControl {
  @Input() name: string;
  @Input() label: string = null;
  @Input() valueString: string = null;
  @Input() valueNumber: number = null;
  @Input() items: Array<SelectItem> = [];
  @Input() valid: boolean = false;
  @Input() type: FormSelectControlType = 'STRING';
  @Input() hasEmpty: Boolean = false;

  @Output() public onChangeString: EventEmitter<string> = new EventEmitter();
  @Output() public onChangeNumber: EventEmitter<number> = new EventEmitter();

  public getValue(): string {
    switch (this.type) {
      case 'STRING':
        return this.valueString;
      case 'NUMERIC':
        return this.valueNumber == null ? '' : String(this.valueNumber);
    }
  }

  public getItems(): Array<SelectItem> {
    let items = [];

    if (this.hasEmpty) {
      items.push(new SelectItem('', ''));
    }

    this.items.forEach(it => items.push(it));

    return items;
  }

  public onValueChange(value: string) {
    switch (this.type) {
      case 'STRING':
        this.valueString = value;
        this.onChangeString.emit(value);
        break;
      case 'NUMERIC':
        this.valueNumber = value == '' ? null : Number(value);
        this.onChangeNumber.emit(value == '' ? null : Number(value));
        break;
    }
  }
}

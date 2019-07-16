import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../select-item';

export type FormSelectControlType = 'NUMERIC' | 'STRING';

@Component({
  selector: '[app-form-select-control]',
  templateUrl: './form-select.control.html',
  styleUrls: ['./form-select.control.less']
})
export class FormSelectControl {
  public value: string;

  @Input() name: string;
  @Input() label: string = null;
  @Input() items: Array<SelectItem> = [];
  @Input() valid: boolean = false;
  @Input() type: FormSelectControlType = 'STRING';
  @Input() hasEmpty: Boolean = false;

  @Input('valueString')
  set setValueString(val: string) {
    this.value = val == null ? '' : val;
  }

  @Input('valueNumber')
  set setValueNumber(val: number) {
    this.value = val == null ? '' : String(val);
  }

  @Output() public onChangeString: EventEmitter<string> = new EventEmitter();
  @Output() public onChangeNumber: EventEmitter<number> = new EventEmitter();

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
        this.onChangeString.emit(value);
        break;
      case 'NUMERIC':
        this.onChangeNumber.emit(value == '' ? null : Number(value));
        break;
    }
  }
}

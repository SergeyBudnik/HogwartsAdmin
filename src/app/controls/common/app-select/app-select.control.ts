import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../select-item';

export type AppInputSelectValueType = 'NUMBER' | 'STRING';

@Component({
  selector: 'app-select-control',
  templateUrl: './app-select.control.html',
  styleUrls: ['./app-select.control.less']
})
export class AppSelectControl {
  public value: string;

  @Input() items: Array<SelectItem> = [];
  @Input() type: AppInputSelectValueType = 'STRING';
  @Input() hasEmpty: Boolean = false;

  @Input('valueString') set setValueString(val: string) { this.value = val == null ? '' : val; }
  @Input('valueNumber') set setValueNumber(val: number) { this.value = val == null ? '' : String(val); }

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
      case 'NUMBER':
        this.onChangeNumber.emit(value == '' ? null : Number(value));
        break;
    }
  }
}

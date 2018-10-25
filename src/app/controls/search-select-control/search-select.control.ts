import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../select-item';

@Component({
  selector: '[app-search-select-control]',
  templateUrl: './search-select.control.html',
  styleUrls: ['./search-select.control.less']
})
export class SearchSelectControl {
  @Input() public items: Array<SelectItem> = [];
  @Input() public empty: string = null;

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public currentValue: string;

  public onValueChange(value: string) {
    this.currentValue = value;

    if (value.length == 0) {
      this.onChange.emit(null);
    } else {
      this.onChange.emit(value);
    }
  }
}

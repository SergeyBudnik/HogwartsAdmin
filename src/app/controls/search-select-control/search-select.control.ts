import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../select-item';

@Component({
  selector: '[app-search-select-control]',
  templateUrl: './search-select.control.html',
  styleUrls: ['./search-select.control.less']
})
export class SearchSelectControl {
  @Input() public items: Array<SelectItem> = [];

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public currentValue: string;

  public onValueChange(value: string) {
    this.currentValue = value;

    this.onChange.emit(value);
  }
}

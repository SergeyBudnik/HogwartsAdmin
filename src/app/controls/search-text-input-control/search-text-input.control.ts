import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-search-text-input-control]',
  templateUrl: './search-text-input.control.html',
  styleUrls: ['./search-text-input.control.less']
})
export class SearchTextInputControl {
  @Input() public placeholder: string = '';
  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public onValueChange(value: string) {
    this.onChange.emit(value);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-text-control',
  templateUrl: './app-text.control.html',
  styleUrls: ['./app-text.control.less']
})
export class AppTextControl {
  @Input() public value: string = '';
  @Input() public placeholder: string = '';
  @Input() public enabled: boolean = true;
  @Input() public icon: string = null;

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public doOnChange(value: string) {
    this.value = value;

    this.onChange.emit(value);
  }
}

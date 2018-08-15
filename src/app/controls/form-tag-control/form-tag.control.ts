import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: '[app-form-tag-control]',
  templateUrl: './form-tag.control.html',
  styleUrls: ['./form-tag.control.less']
})
export class FormTagControl {
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: Array<string>;
  @Input() valid: boolean;

  @Output() public onChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  public constructor(
    private clipboardService: ClipboardService
  ) {}

  public onValueAdded(addedItem: any): void {
    const newValue = [];

    this.value
      .forEach(it => newValue.push(it));

    newValue.push(addedItem.value);

    this.value = newValue;

    this.onChange.emit(this.value);
  }

  public onValueRemoved(removedItem: any): void {
    const newValue = [];

    this.value
      .filter(it => it != removedItem)
      .forEach(it => newValue.push(it));

    this.value = newValue;

    this.onChange.emit(this.value);
  }

  public onValueSelected(value: any) {
    this.clipboardService.copyFromContent(value)
  }
}

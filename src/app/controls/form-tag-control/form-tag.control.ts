import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringArrayReference} from '../string-array-reference';

@Component({
  selector: '[app-form-tag-control]',
  templateUrl: './form-tag.control.html',
  styleUrls: ['./form-tag.control.less']
})
export class FormTagControl {
  @Input() name: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() valueRef: StringArrayReference;
  @Input() valid: boolean;

  @Output() public onChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  public onValueAdded(value: any): void {
    const res: Array<string> = [value.value];

    this.valueRef
      .getValue()
      .forEach(it => res.push(it));

    this.valueRef.setValue(res);

    this.onChange.emit(res);
  }

  public onValueRemoved(value: any): void {
    const res: Array<string> = [];

    this.valueRef
      .getValue()
      .filter(it => it !== value)
      .forEach(it => res.push(it));

    this.valueRef.setValue(res);

    this.onChange.emit(res);
  }
}

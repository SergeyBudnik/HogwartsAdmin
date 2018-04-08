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

  @Output() public onChange: EventEmitter<string> = new EventEmitter();
}

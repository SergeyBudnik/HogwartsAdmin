import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IMyDateModel} from 'mydatepicker';

@Component({
  selector: '[app-form-date-control]',
  templateUrl: './form-date.control.html',
  styleUrls: ['./form-date.control.less'],
  encapsulation: ViewEncapsulation.None
})
export class FormDateControl {
  @Input() public label: string = '';
  @Input() public dateFormat: string = 'dd.mm.yyyy';

  public value: number;
  public date = {date: {year: 0, month: 0, day: 0}};

  @Output() public onChange: EventEmitter<number> = new EventEmitter();

  @Input('value') set setValue(value: number) {
    this.value = value;

    const date: Date = new Date(value);

    this.date = {date: {year: 0, month: 0, day: 0}};

    this.date.date.year = date.getFullYear();
    this.date.date.month = date.getMonth() + 1;
    this.date.date.day = date.getDate();
  }

  public onDateChange(event: IMyDateModel): void {
    this.value = FormDateControl.getTime(event);

    this.onChange.emit(this.value);
  }

  private static getTime(event: any): number {
    return new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day,
      0, 0, 0, 0
    ).getTime();
  }
}

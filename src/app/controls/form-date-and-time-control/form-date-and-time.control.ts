import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {DateAndTime} from '../../data/date-and-time';
import {Time} from '../../data';

@Component({
  selector: 'app-form-date-and-time-control',
  templateUrl: './form-date-and-time.control.html',
  styleUrls: ['./form-date-and-time.control.less'],
  encapsulation: ViewEncapsulation.None
})
export class FormDateAndTimeControl {
  @Input() public dateLabel: string = '';
  @Input() public timeLabel: string = '';
  @Input() public dateAndTime: DateAndTime = new DateAndTime(0, 'T_08_00');
  @Input() public editable: boolean = true;

  @Output() public onChange: EventEmitter<DateAndTime> = new EventEmitter();

  public onDateChange(date: number) {
    this.dateAndTime.date = date;

    this.onChange.emit(this.dateAndTime);
  }

  public onTimeChange(time: Time) {
    this.dateAndTime.time = time;

    this.onChange.emit(this.dateAndTime);
  }
}

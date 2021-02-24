import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IMyDate, IMyDateModel} from 'mydatepicker';
import {DatesUtils} from '../../../utils/dates-utils';

@Component({
  selector: 'app-date-control',
  templateUrl: './app-date.control.html',
  styleUrls: ['./app-date.control.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppDateControl {
  @Input() public dateFormat: string = 'dd.mm.yyyy';
  @Input() public editable: boolean = true;

  public model: AppDateControlModel = new AppDateControlModel(new Date());

  @Output() public onChange: EventEmitter<number> = new EventEmitter();

  @Input('value') set setValue(value: number) {
    let date: Date;

    if (value === null || value === 0) {
      date = new Date();
    } else {
      date = new Date(value);
    }

    this.model = new AppDateControlModel(date);

    this.onChange.emit(
      DatesUtils.buildDateYMDFromDate(date).getTime()
    );
  }

  public onDateChange(event: IMyDateModel): void {
    const value = DatesUtils.buildDateYMDFromYMD(
      event.date.year,
      event.date.month - 1,
      event.date.day
    ).getTime();

    this.onChange.emit(value);
  }
}

export class AppDateControlModel {
  public date: IMyDate;

  public constructor(date: Date) {
    this.date = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }
}

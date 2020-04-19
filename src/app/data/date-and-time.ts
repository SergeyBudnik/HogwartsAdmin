import {Time, TimeUtils} from './time';

export class DateAndTime {
  constructor(
    public date: number,
    public time: Time
  ) {}
}

export class DateAndTimeUtils {
  public static toMilliseconds(dateAndTime: DateAndTime): number {
    return dateAndTime.date + TimeUtils.getTimeMills(dateAndTime.time);
  }

  public static fromMilliseconds(milliseconds: number): DateAndTime {
    let dirtyDate = new Date(milliseconds);

    let date = new Date(
      dirtyDate.getFullYear(),
      dirtyDate.getMonth(),
      dirtyDate.getDate(),
      0, 0, 0, 0
    );

    let hourAndMinutes = new Date(
      0, 0, 0,
      dirtyDate.getHours(),
      dirtyDate.getMinutes(),
      0, 0
    );

    return new DateAndTime(
      date.getTime(),
      TimeUtils.fromDate(hourAndMinutes)
    );
  }
}

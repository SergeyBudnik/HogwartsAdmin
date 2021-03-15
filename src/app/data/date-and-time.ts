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
    const dirtyDate = new Date(milliseconds);

    const date = new Date(
      dirtyDate.getFullYear(),
      dirtyDate.getMonth(),
      dirtyDate.getDate(),
      0, 0, 0, 0
    );

    const hourAndMinutes = new Date(
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

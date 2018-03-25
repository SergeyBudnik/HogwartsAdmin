import {DayOfWeek} from './day-of-week';
import {Time} from './time';

export class DayAndTime {
  public constructor(
    readonly day: DayOfWeek,
    readonly time: Time
  ) {}
}

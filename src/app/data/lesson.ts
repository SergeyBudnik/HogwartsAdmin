import {Time} from './time';
import {DayOfWeek} from './day-of-week';

export class Lesson {
  public constructor(
    public id: number,
    public teacherId: number,
    public day: DayOfWeek,
    public startTime: Time,
    public finishTime: Time,
    public creationTime: number,
    public deactivationTime: number
  ) {}
}

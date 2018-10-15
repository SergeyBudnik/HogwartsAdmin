import {DayOfWeek} from './day-of-week';
import {Time} from './time';

export class TeacherAvailability {
  public constructor(
    public dayOfWeek: DayOfWeek,
    public time: Time
  ) {}
}

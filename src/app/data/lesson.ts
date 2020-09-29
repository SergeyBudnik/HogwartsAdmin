import {Time} from './time';
import {DayOfWeek} from './day-of-week';
import {DatesUtils} from '../utils/dates-utils';

export class Lesson {
  public constructor(
    public id: number = null,
    public teacherLogin: string = null,
    public day: DayOfWeek = null,
    public startTime: Time = null,
    public finishTime: Time = null,
    public creationTime: number = DatesUtils.buildDateYMDFromDate(new Date()).getTime(),
    public deactivationTime: number = DatesUtils.buildDateYMDFromDate(new Date()).getTime()
  ) {}

  public static copy(lesson: Lesson): Lesson {
    return new Lesson(
      lesson.id,
      lesson.teacherLogin,
      lesson.day,
      lesson.startTime,
      lesson.finishTime,
      lesson.creationTime,
      lesson.deactivationTime
    );
  }
}

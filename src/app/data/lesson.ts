import {Time} from './time';
import {DayOfWeek} from './day-of-week';

export class Lesson {
  public constructor(
    public id: number = null,
    public teacherLogin: string = null,
    public day: DayOfWeek = null,
    public startTime: Time = null,
    public finishTime: Time = null,
    public creationTime: number = null,
    public deactivationTime: number = null
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

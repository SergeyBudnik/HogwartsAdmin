import {Time} from './time';
import {DayOfWeek} from './day-of-week';

export class Lesson {
  public constructor(
    public id: number,
    public teacherLogin: string,
    public day: DayOfWeek,
    public startTime: Time,
    public finishTime: Time,
    public creationTime: number,
    public deactivationTime: number
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

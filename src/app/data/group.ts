import {Age} from './age';
import {EducationLevel} from './education-level';
import {Lesson} from './lesson';
import {GroupType} from './group-type';
import {DayOfWeekUtils} from './day-of-week';
import {TimeUtils} from './time';

export class Group {
  public constructor(
    public id: number = null,
    public cabinetId: number = null,
    public managerId: number = null,
    public bookName: string = null,
    public type: GroupType = null,
    public lessons: Array<Lesson> = [],
    public age: Age = 'UNKNOWN',
    public educationLevel: EducationLevel = 'UNKNOWN',
    public color: string = '#FF0000'
  ) {}

  public static withSortedLessons(group: Group) {
    let lessonsTimeComparator = (o1: Lesson, o2: Lesson) => {
      let timeIndex1 = TimeUtils.index(o1.startTime);
      let timeIndex2 = TimeUtils.index(o2.startTime);

      if (timeIndex1 === timeIndex2) {
        return 0;
      } else {
        return timeIndex1 > timeIndex2 ? 1 : -1;
      }
    };

    let lessonsDayOfWeekComparator = (o1: Lesson, o2: Lesson) => {
      let dayIndex1 = DayOfWeekUtils.index(o1.day);
      let dayIndex2 = DayOfWeekUtils.index(o2.day);

      if (dayIndex1 === dayIndex2) {
        return lessonsTimeComparator(o1, o2);
      } else {
        return dayIndex1 > dayIndex2 ? 1 : -1;
      }
    };

    let lessonsDeactivationTimeComparator = (o1: Lesson, o2: Lesson) => {
      let deactivated1 = o1.deactivationTime == null;
      let deactivated2 = o2.deactivationTime == null;

      if (deactivated1 === deactivated2) {
        return lessonsDayOfWeekComparator(o1, o2);
      } else {
        return deactivated1 ? -1 : 1;
      }
    };

    let lessons = group.lessons.sort((o1, o2) => lessonsDeactivationTimeComparator(o1, o2));

    return new Group(
      group.id,
      group.cabinetId,
      group.managerId,
      group.bookName,
      group.type,
      lessons,
      group.age,
      group.educationLevel,
      group.color,
    )
  }
}

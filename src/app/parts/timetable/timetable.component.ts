import {TranslatableComponent} from '../../translation/translation.component';
import {Component, Input} from '@angular/core';
import {Lesson, DayOfWeek, DayOfWeekUtils, Group, Time, TimeUtils} from '../../data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent extends TranslatableComponent {
  @Input() public showFilters: boolean;

  public daysOfWeek: Array<DayOfWeek> = DayOfWeekUtils.values;
  public timeRange: Array<Time> = [];

  private rawLessons: Array<Lesson> = null;
  private rawGroups: Array<Group> = null;

  private groups: Map<number, Group>;
  private lessons: Map<DayOfWeek, Map<Time, Lesson>>;

  @Input('lessons') public set setLessons(rawLessons: Array<Lesson>) {
    this.rawLessons = rawLessons;

    this.onInit();
  }

  @Input('groups') public set setGroups(rawGroups: Array<Group>) {
    this.rawGroups = rawGroups;

    this.onInit();
  }

  private onInit() {
    if (!this.rawLessons || !this.rawGroups) {
      return;
    }

    this.groups = this.getGroupsMap(this.rawGroups);
    this.lessons = this.getLessonsMap(this.rawLessons);
  }

  public constructor(
    private router: Router
  ) {
    super();
  }

  public getCurrentDay(): DayOfWeek {
    const day = new Date().getDay();

    return DayOfWeekUtils.values[day === 0 ? 6 : day - 1];
  }

  public getCurrentTime(): Time {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const index = 2 * (hour - 7) + minute / 30;

    return 0 <= index && index < TimeUtils.values.length ?
      TimeUtils.values[index] : null;
  }

  public getGroup(dayOfWeek: DayOfWeek, time: Time): Group {
    if (this.lessons != null && this.groups != null) {
      const lesson = this.lessons.get(dayOfWeek).get(time);

      return !!lesson ? this.getGroupByLesson(lesson) : null;
    }

    return null;
  }

  public onTimeSlotClick(dayOfWeek: DayOfWeek, time: Time): void {
    const group = this.getGroup(dayOfWeek, time);

    if (group) {
      this.router.navigate([`/groups/${group.id}/information`]);
    }
  }

  private getGroupsMap(groupsArray: Array<Group>): Map<number, Group> {
    const groupsMap: Map<number, Group> = new Map<number, Group>();

    groupsArray.forEach(it => groupsMap.set(it.id, it));

    return groupsMap;
  }

  private getLessonsMap(lessonsArray: Array<Lesson>): Map<DayOfWeek, Map<Time, Lesson>> {
    const lessons: Map<DayOfWeek, Map<Time, Lesson>> = new Map<DayOfWeek, Map<Time, Lesson>>();

    DayOfWeekUtils.values.forEach(dayOfWeek => { lessons.set(dayOfWeek, new Map<Time, Lesson>()) });

    let earliestLessonStartTime: Time = 'T_21_30';
    let latestLessonFinishTime: Time = 'T_07_00';

    lessonsArray
      .forEach(lesson => {
        TimeUtils.range(lesson.startTime, lesson.finishTime).forEach(time => {
          lessons.get(lesson.day).set(time, lesson);
        });

        if (TimeUtils.earlier(lesson.startTime, earliestLessonStartTime)) {
          earliestLessonStartTime = lesson.startTime;
        }

        if (TimeUtils.later(lesson.finishTime, latestLessonFinishTime)) {
          latestLessonFinishTime = lesson.finishTime;
        }
      });

    this.timeRange = TimeUtils.range(
      earliestLessonStartTime,
      latestLessonFinishTime
    );

    return lessons;
  }

  private getGroupByLesson(lesson: Lesson): Group {
    let lessonGroup: Group = null;

    this.groups.forEach(group => {
      const searchedLesson: Lesson = group.lessons.find(it => lesson.id === it.id);

      if (!!searchedLesson) {
        lessonGroup = group;
      }
    });

    return lessonGroup;
  }
}

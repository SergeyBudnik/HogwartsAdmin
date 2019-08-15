import {TranslatableComponent} from '../../translation/translation.component';
import {Component, Input} from '@angular/core';
import {Lesson, DayOfWeek, DayOfWeekUtils, Group, Time, TimeUtils} from '../../data';
import {Router} from '@angular/router';
import {endOfWeek} from 'date-fns'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent extends TranslatableComponent {
  @Input() public showFilters: boolean;

  public daysOfWeek: Array<DayOfWeek> = DayOfWeekUtils.values;

  private rawLessons: Array<Lesson> = null;
  private rawGroups: Array<Group> = null;

  private groups: Map<number, Group>;
  private lessons: Map<DayOfWeek, Map<Time, Lesson>>;

  private earliestLessonStartTime: Time = 'T_21_30';
  private latestLessonFinishTime: Time = 'T_07_00';

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

  public getTimeRange(): Array<Time> {
    return TimeUtils.range(
      this.earliestLessonStartTime,
      this.latestLessonFinishTime
    );
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

    lessonsArray
      .filter(lesson => this.isLessonActive(lesson))
      .forEach(lesson => {
        TimeUtils.range(lesson.startTime, lesson.finishTime).forEach(time => {
          lessons.get(lesson.day).set(time, lesson);
        });

        if (TimeUtils.earlier(lesson.startTime, this.earliestLessonStartTime)) {
          this.earliestLessonStartTime = lesson.startTime;
        }

        if (TimeUtils.later(lesson.finishTime, this.latestLessonFinishTime)) {
          this.latestLessonFinishTime = lesson.finishTime;
        }
      });

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

  private isLessonActive(lesson: Lesson): boolean {
    const weekEndTime = endOfWeek(new Date()).getTime();

    if (!lesson.deactivationTime) {
      return true;
    } else if (weekEndTime <= lesson.deactivationTime) {
      return true;
    } else {
      return false;
    }
  }
}

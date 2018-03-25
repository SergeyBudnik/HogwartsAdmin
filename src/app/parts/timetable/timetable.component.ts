import {TranslatableComponent} from '../../translation/translation.component';
import {Component, Input} from '@angular/core';
import {Lesson} from '../../data/lesson';
import {DayOfWeek, DayOfWeekUtils} from '../../data/day-of-week';
import {Group} from '../../data/group';
import {Time, TimeUtils} from '../../data/time';
import {EducationLevel, EducationLevelUtils} from '../../data/education-level';
import {Age, AgeUtils} from '../../data/age';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.less']
})
export class TimetableComponent extends TranslatableComponent {
  @Input() public showFilters: boolean;

  public educationLevels: Array<EducationLevel> = EducationLevelUtils.values;
  public ages: Array<Age> = AgeUtils.values;
  public daysOfWeek: Array<DayOfWeek> = DayOfWeekUtils.values;

  public ageFilter: Age = 'UNKNOWN';
  public educationLevelFilter: EducationLevel = 'UNKNOWN';

  private groups: Array<Group>;
  private lessons: Map<DayOfWeek, Map<Time, Lesson>>;

  private filteredGroups: Map<number, Group>;

  private earliestLessonStartTime: Time = 'T_21_30';
  private latestLessonFinishTime: Time = 'T_07_00';

  @Input('lessons') public set setLessons(lessonsArray: Array<Lesson>) {
    const lessons: Map<DayOfWeek, Map<Time, Lesson>> = new Map<DayOfWeek, Map<Time, Lesson>>();

    DayOfWeekUtils.values.forEach(dayOfWeek => {
      lessons.set(dayOfWeek, new Map<Time, Lesson>());
    });

    lessonsArray.forEach(lesson => {
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

    this.lessons = lessons;
  }

  @Input('groups') public set setGroups(groupsArray: Array<Group>) {
    this.groups = groupsArray;
    this.filteredGroups = this.getFilteredGroups();
  }

  public constructor(
    private router: Router
  ) {
    super();
  }

  public onAgeFilterChange(ageFilter): void {
    this.ageFilter = ageFilter;
    this.filteredGroups = this.getFilteredGroups();
  }

  public onEducationLevelFilterChange(educationLevelFilter): void {
    this.educationLevelFilter = educationLevelFilter;
    this.filteredGroups = this.getFilteredGroups();
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
    if (this.lessons != null && this.filteredGroups != null) {
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

  private getFilteredGroups(): Map<number, Group> {
    const filteredGroups: Map<number, Group> = new Map<number, Group>();

    this.groups
      .filter(it => this.educationLevelFilter === 'UNKNOWN' || this.educationLevelFilter === it.educationLevel)
      .filter(it => this.ageFilter === 'UNKNOWN' || this.ageFilter === it.age)
      .forEach(it => filteredGroups.set(it.id, it));

    return filteredGroups;
  }

  private getGroupByLesson(lesson: Lesson): Group {
    let lessonGroup: Group = null;

    this.filteredGroups.forEach(group => {
      const searchedLesson: Lesson = group.lessons.find(it => lesson.id === it.id);

      if (!!searchedLesson) {
        lessonGroup = group;
      }
    });

    return lessonGroup;
  }
}

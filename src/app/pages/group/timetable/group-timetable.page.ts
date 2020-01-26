import {Component} from '@angular/core';
import {LoginService, NavigationService} from '../../../service';
import {ActivatedRoute} from '@angular/router';
import {Group, Lesson} from '../../../data';
import {GroupsHttp} from '../../../http';
import {endOfWeek, startOfWeek} from 'date-fns';

@Component({
  selector: 'app-group-timetable-page',
  templateUrl: './group-timetable.page.html',
  styleUrls: ['./group-timetable.page.less']
})
export class GroupTimetablePageComponent {
  public group: Group = new Group();
  public groupLessons: Array<Lesson> = [];

  public loadingInProgress = true;

  public constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp
  ) {
    this.loadingInProgress = true;

    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const groupId = Number(params.get('id'));

        this.load(groupId);
      });
    });
  }

  public onWeekChanged(currentWeek: number) {
    const time = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 * currentWeek);

    this.initTimetable(time);
  }

  private load(groupId: number) {
    this.groupsHttp
      .getGroup(groupId)
      .then(group => {
        this.group = group;

        this.initTimetable(new Date());

        this.loadingInProgress = false;
      });
  }

  private initTimetable(time: Date) {
    const options = {weekStartsOn: 1};

    const weekStartTime = startOfWeek(time, options).getTime() + 9 * 60 * 60 * 1000;
    const weekEndTime = endOfWeek(time, options).getTime();

    this.groupLessons = this.group.lessons
      .filter(lesson => lesson.creationTime <= weekStartTime)
      .filter(lesson => !lesson.deactivationTime || weekEndTime <= lesson.deactivationTime);
  }
}

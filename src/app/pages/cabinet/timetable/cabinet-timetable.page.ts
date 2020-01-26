import {Component} from '@angular/core';
import {LoginService, NavigationService} from '../../../service';
import {ActivatedRoute} from '@angular/router';
import {Cabinet, Group, Lesson} from '../../../data';
import {CabinetsHttp, GroupsHttp} from '../../../http';
import {endOfWeek, startOfWeek} from 'date-fns';

@Component({
  selector: 'app-cabinet-timetable-page',
  templateUrl: './cabinet-timetable.page.html',
  styleUrls: ['./cabinet-timetable.page.less']
})
export class CabinetTimetablePageComponent {
  public cabinet: Cabinet = new Cabinet(null, null, null);
  private allGroups: Array<Group> = [];

  public cabinetGroups: Array<Group> = [];
  public cabinetLessons: Array<Lesson> = [];

  public loadingInProgress = true;

  public constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cabinetsHttp: CabinetsHttp,
    private groupsHttp: GroupsHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        this.cabinet.id = Number(params.get('id'));

        this.init(this.cabinet.id);
      });
    });
  }

  private init(cabinetId: number): void {
    Promise.all([
      this.cabinetsHttp.getCabinet(cabinetId),
      this.groupsHttp.getAllGroups()
    ]).then(it => {
      this.cabinet = it[0];
      this.allGroups = it[1];

      this.initTimetable(cabinetId, this.allGroups, new Date());

      this.loadingInProgress = false;
    });
  }

  public onWeekChanged(currentWeek: number) {
    const time = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 * currentWeek);

    this.initTimetable(this.cabinet.id, this.allGroups, time);
  }

  private initTimetable(
    cabinetId: number,
    allGroups: Array<Group>,
    time: Date
  ): void {
    const options = {weekStartsOn: 1};

    const weekStartTime = startOfWeek(time, options).getTime() + 9 * 60 * 60 * 1000;
    const weekEndTime = endOfWeek(time, options).getTime();

    const cabinetGroups: Array<Group> = [];
    const cabinetLessons: Array<Lesson> = [];

    allGroups
      .filter(group => group.cabinetId === cabinetId)
      .forEach(group => {
        cabinetGroups.push(group);

        group.lessons
          .filter(lesson => lesson.creationTime <= weekStartTime)
          .filter(lesson => !lesson.deactivationTime || weekEndTime <= lesson.deactivationTime)
          .forEach(lesson => {
            cabinetLessons.push(lesson)
          });
      });

    this.cabinetGroups = cabinetGroups;
    this.cabinetLessons = cabinetLessons;
  }
}

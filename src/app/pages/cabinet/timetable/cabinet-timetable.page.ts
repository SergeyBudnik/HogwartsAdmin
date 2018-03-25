import {TranslatableComponent} from '../../../translation/translation.component';
import {Component} from '@angular/core';
import {CabinetsService, GroupsService, LoginService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cabinet, Group, Lesson} from '../../../data';

@Component({
  selector: 'app-cabinet-timetable-page',
  templateUrl: './cabinet-timetable.page.html',
  styleUrls: ['./cabinet-timetable.page.less']
})
export class CabinetTimetablePageComponent extends TranslatableComponent {
  public cabinet: Cabinet = new Cabinet(null, null, null);

  public cabinetGroups: Array<Group> = [];
  public cabinetLessons: Array<Lesson> = [];

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cabinetsService: CabinetsService,
    private groupsService: GroupsService,
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {

      this.route.paramMap.subscribe(params => {
        this.cabinet.id = Number(params.get('id'));

        this.init(this.cabinet.id);
      });
    }
  }

  private init(cabinetId: number): void {
    Promise.all([
      this.cabinetsService.getCabinet(cabinetId),
      this.groupsService.getAllGroups()
    ]).then(it => {
      this.cabinet = it[0];
      this.initTimetable(cabinetId, it[1]);

      this.loadingInProgress = false;
    });
  }

  private initTimetable(
    cabinetId: number,
    allGroups: Array<Group>
  ): void {
    allGroups
      .filter(group => group.cabinetId === cabinetId)
      .forEach(group => {
        this.cabinetGroups.push(group);

        group.lessons.forEach(lesson => this.cabinetLessons.push(lesson));
      });
  }
}

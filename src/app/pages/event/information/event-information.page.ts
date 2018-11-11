import {Component} from '@angular/core';
import {Cabinet, Event, EventTypeUtils, Teacher, TimeUtils} from '../../../data';
import {ActivatedRoute, Router} from '@angular/router';
import {AppTranslationsService, LoginService} from '../../../service';
import {ToastsManager} from 'ng2-toastr';
import {SelectItem} from '../../../controls/select-item';
import {TranslateService} from '@ngx-translate/core';
import {CabinetsHttp, EventsHttp, TeachersHttp} from '../../../http';
import {CommonPage} from '../../common/common.page';

@Component({
  selector: 'app-event-information-page',
  templateUrl: './event-information.page.html',
  styleUrls: ['./event-information.page.less']
})
export class EventInformationPage extends CommonPage {
  public eventTypeItems = EventTypeUtils.values.map(it => new SelectItem('-', it));
  public timeItems = TimeUtils.values.map(it => new SelectItem('-', it));

  private allCabinets: Array<Cabinet>;
  private allTeachers: Array<Teacher>;

  public loadingInProgress = true;

  public event: Event;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private eventsHttp: EventsHttp,
    private cabinetsHttp: CabinetsHttp,
    private teachersHttp: TeachersHttp,
    private translateService: TranslateService,
    private appTranslationService: AppTranslationsService,
    private toastr: ToastsManager
  ) {
    super();

    const thisService = this;

    this.doInit(router);
    this.doLogin(this.loginService, () => thisService.init());

    this.appTranslationService.enableTranslations();
  }

  private init() {
    this.parseParams((speakingClubId) => this.initSpeakingClub(speakingClubId));
  }

  public getCabinetItems(): Array<SelectItem> {
    return this.allCabinets.map(it => new SelectItem(it.name, String(it.id)));
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.allTeachers.map(it => new SelectItem(it.name, String(it.id)));
  }

  public save(): void {
    this.loadingInProgress = true;

    if (this.event.id == null) { this.saveNew()} else { this.saveExisting() }
  }

  private saveNew() {
    this.eventsHttp.createEvent(this.event).then(speakingClubId => {
      this.router.navigate([`/speaking-club/${speakingClubId}/information`]);
    });
  }

  private saveExisting() {
    this.eventsHttp.editEvent(this.event).then(() => {
      this.loadingInProgress = false;

      this.toastr.success(`Speaking Club успешно сохранён.`);
    });
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.eventsHttp.deleteEvent(this.event.id).then(() =>
      this.router.navigate(['/events'])
    );
  }

  private initSpeakingClub(eventId: number) {
    Promise.all([
      this.cabinetsHttp.getAllCabinets(),
      this.teachersHttp.getAllTeachers()
    ]).then(it => {
      this.allCabinets = it[0];
      this.allTeachers = it[1];

      if (eventId == null) {
        this.event = new Event();

        this.loadingInProgress = false;
      } else {
        this.eventsHttp.getEvent(eventId).then(event => {
          this.event = event;

          this.loadingInProgress = false;
        });
      }
    })
  }

  private parseParams(action: (number) => void) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id === 'new') {
        action(null)
      } else {
        action(Number(id));
      }
    });
  }
}

import {Component, ViewContainerRef} from '@angular/core';
import {Cabinet, Event, EventTypeUtils, Teacher, TimeUtils} from '../../../data';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetsService, LoginService, EventsService, TeachersService} from '../../../service';
import {ToastsManager} from 'ng2-toastr';
import {TranslatableComponent} from '../../../translation/translation.component';
import {SelectItem} from '../../../controls/select-item';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-event-information-page',
  templateUrl: './event-information.page.html',
  styleUrls: ['./event-information.page.less']
})
export class EventInformationPage extends TranslatableComponent {
  private allCabinets: Array<Cabinet>;
  private allTeachers: Array<Teacher>;

  public loadingInProgress = true;

  public event: Event;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private eventsService: EventsService,
    private cabinetsService: CabinetsService,
    private teachersService: TeachersService,
    private translateService: TranslateService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    super();

    this.translateService.setDefaultLang('ru');
    this.translateService.use('ru');

    EventTypeUtils.enableTranslations(this.translateService);

    this.toastr.setRootViewContainerRef(vcr);

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.parseParams((speakingClubId) => this.initSpeakingClub(speakingClubId));
    }
  }

  public getEventTypeItems(): Array<SelectItem> {
    return EventTypeUtils.values.map(it => new SelectItem(null, it));
  }

  public getCabinetItems(): Array<SelectItem> {
    return this.allCabinets.map(it => new SelectItem(it.name, String(it.id)));
  }

  public getTeachersItems(): Array<SelectItem> {
    return this.allTeachers.map(it => new SelectItem(it.name, String(it.id)));
  }

  public getTimeItems(): Array<SelectItem> {
    return TimeUtils.values.map(it => new SelectItem(this.getTimeTranslation(it), it));
  }

  public save(): void {
    this.loadingInProgress = true;

    if (this.event.id == null) { this.saveNew()} else { this.saveExisting() }
  }

  private saveNew() {
    this.eventsService.createEvent(this.event).then(speakingClubId => {
      this.router.navigate([`/speaking-club/${speakingClubId}/information`]);
    });
  }

  private saveExisting() {
    this.eventsService.editEvent(this.event).then(() => {
      this.loadingInProgress = false;

      this.toastr.success(`Speaking Club успешно сохранён.`);
    });
  }

  public delete(): void {
    this.loadingInProgress = true;

    this.eventsService.deleteEvent(this.event.id).then(() =>
      this.router.navigate(['/events'])
    );
  }

  private initSpeakingClub(eventId: number) {
    Promise.all([
      this.cabinetsService.getAllCabinets(),
      this.teachersService.getAllTeachers()
    ]).then(it => {
      this.allCabinets = it[0];
      this.allTeachers = it[1];

      if (eventId == null) {
        this.event = new Event();

        this.loadingInProgress = false;
      } else {
        this.eventsService.getEvent(eventId).then(event => {
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

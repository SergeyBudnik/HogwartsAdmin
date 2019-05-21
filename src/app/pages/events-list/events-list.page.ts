import {Component} from '@angular/core';
import {AppTranslationsService, LoginService} from '../../service';
import {Router} from '@angular/router';
import {Cabinet, Event, EventParticipant, EventParticipantStatus} from '../../data';
import {TranslateService} from '@ngx-translate/core';
import {CabinetsHttp, EventParticipantsHttp, EventsHttp, TeachersHttp} from '../../http';
import {CommonPage} from '../common/common.page';
import {EventStatus} from '../../data/event-status';
import {SelectItem} from '../../controls/select-item';

type EventStatusType = 'EVENT_STATUS_ACTIVE' | 'EVENT_STATUS_ALL';

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.less']
})
export class EventsListPageComponent extends CommonPage {
  public eventStatusTypeItems = [
    new SelectItem('', 'EVENT_STATUS_ACTIVE'),
    new SelectItem('', 'EVENT_STATUS_ALL')
  ];

  private allEvents: Array<Event> = [];
  private allCabinets: Array<Cabinet> = [];
  private allParticipants: Array<EventParticipant> = [];

  public events: Array<Event> = [];

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private eventsHttp: EventsHttp,
    private eventParticipantsHttp: EventParticipantsHttp,
    private teachersHttp: TeachersHttp,
    private cabinetsHttp: CabinetsHttp,
    private translateService: TranslateService,
    private appTranslationService: AppTranslationsService
  ) {
    super();

    let thisService = this;

    this.doInit(router);
    this.doLogin(loginService.getAuthToken(), () => thisService.init());

    this.appTranslationService.enableTranslations();

    this.enableTranslationsRu();
  }

  private init() {
    this.enableTranslationsRu();

    Promise.all([
      this.eventsHttp.getAllEvents(),
      this.eventParticipantsHttp.getAllParticipants(),
      this.cabinetsHttp.getAllCabinets()
    ])
      .then(it => {
        this.allEvents = it[0];
        this.allParticipants = it[1];
        this.allCabinets = it[2];

        this.onFilterChange('EVENT_STATUS_ACTIVE');

        this.loadingInProgress = false;
      });
  }

  public onFilterChange(eventStatusType: EventStatusType) {
    this.events = this.allEvents
      .filter(it => {
        switch (eventStatusType) {
          case 'EVENT_STATUS_ALL':
            return true;
          case 'EVENT_STATUS_ACTIVE':
            let status = this.getStatus(it);

            return status === 'ON_GOING' || status === 'PENDING';
          default:
            throw new Error(`Unexpected status ${eventStatusType}`);
        }
      })
      .sort((e1, e2) => e2.date - e1.date);
  }

  public getParticipantsAmount(event: Event, eventParticipantStatus: EventParticipantStatus): number {
    return this.allParticipants
      .filter(it => it.eventId === event.id)
      .filter(it => it.status === eventParticipantStatus)
      .length;
  }

  public getStatus(event: Event): EventStatus {
    let currentDate = new Date();
    let eventDate = new Date(event.date);

    let comparator: (n1: number, n2: number, onEqual: () => EventStatus) => (EventStatus) = (n1, n2, onEqual) => {
      if (n1 > n2) { return 'FINISHED'; } else if (n2 > n1) { return 'PENDING'; } else { return onEqual(); }
    };

    return comparator(currentDate.getFullYear(), eventDate.getFullYear(), () => {
      return comparator(currentDate.getMonth(), eventDate.getMonth(), () => {
        return comparator(currentDate.getDate(), eventDate.getDate(), () => 'ON_GOING')
      })
    })
  }

  public getCabinet(id: number): Cabinet {
    return this.allCabinets.find(it => it.id === id);
  }

  public enableTranslationsRu() {
    this.translateService.setTranslation('ru', {
      EVENT_STATUS_ACTIVE: 'Активные',
      EVENT_STATUS_ALL: 'Все'
    }, true)
  }
}

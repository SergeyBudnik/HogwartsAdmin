import {TranslatableComponent} from '../../translation/translation.component';
import {Component} from '@angular/core';
import {LoginService} from '../../service';
import {Router} from '@angular/router';
import {Cabinet, Event, EventParticipant, EventParticipantStatus, Teacher} from '../../data';
import {TranslateService} from '@ngx-translate/core';
import {CabinetsHttp, EventParticipantsHttp, EventsHttp, TeachersHttp} from '../../http';

export type EventStatus = 'PENDING' | 'ON_GOING' | 'FINISHED'

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.less']
})
export class EventsListPageComponent extends TranslatableComponent {
  public allEvents: Array<Event> = [];

  private allTeachers: Array<Teacher> = [];
  private allCabinets: Array<Cabinet> = [];
  private allParticipants: Array<EventParticipant> = [];

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private eventsHttp: EventsHttp,
    private eventParticipantsHttp: EventParticipantsHttp,
    private teachersHttp: TeachersHttp,
    private cabinetsHttp: CabinetsHttp,
    private translateService: TranslateService
  ) {
    super();

    this.translateService.setDefaultLang('ru');
    this.translateService.use('ru');

    this.translateService.setTranslation('ru', {
      PENDING: 'Состоится',
      ON_GOING: 'В процессе',
      FINISHED: 'Закончился',

      OPEN_LESSON: 'Открытый урок',
      SPEAKING_CLUB: 'Speaking club'
    });

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.eventsHttp.getAllEvents(),
        this.eventParticipantsHttp.getAllParticipants(),
        this.teachersHttp.getAllTeachers(),
        this.cabinetsHttp.getAllCabinets()
      ])
      .then(it => {
        this.allEvents = it[0];
        this.allParticipants = it[1];
        this.allTeachers = it[2];
        this.allCabinets = it[3];

        this.loadingInProgress = false;
      });
    }
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

  public getTeacher(id: number): Teacher {
    return this.allTeachers.find(it => it.id === id);
  }

  public getCabinet(id: number): Cabinet {
    return this.allCabinets.find(it => it.id === id);
  }

  public addNewEvent() {
    this.router.navigate(['/events/new/information']);
  }

  public openEvent(id: number) {
    this.router.navigate([`/events/${id}/information`]);
  }
}

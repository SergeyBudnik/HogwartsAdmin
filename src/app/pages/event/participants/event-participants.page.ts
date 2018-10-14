import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Event, EventParticipant} from '../../../data';
import {TranslateService} from '@ngx-translate/core';
import {EventParticipantsHttp, EventsHttp} from '../../../http';

@Component({
  selector: 'app-event-participants-page',
  templateUrl: './event-participants.page.html',
  styleUrls: ['./event-participants.page.less']
})
export class EventParticipantsPage extends TranslatableComponent {
  public loadingInProgress = true;

  private event: Event;
  private participants: Array<EventParticipant>;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private eventsHttp: EventsHttp,
    private eventParticipantsHttp: EventParticipantsHttp,
    private translateService: TranslateService
  ) {
    super();

    this.translateService.setDefaultLang('ru');
    this.translateService.use('ru');

    this.translateService.setTranslation('ru', {
      REQUEST: 'Оставил заявку',
      EARLY_CONFIRMATION: 'Подтвердил',
      LATE_CONFIRMATION: 'Окончательно подтвердил',
      ATTENDED: 'Посетил',
      NOT_ATTENDED: 'Не посетил',
      CANCELED: 'Отменил'
    });

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.parseParams((eventId) => this.init(eventId));
    }
  }

  public openParticipant(participantId: number) {
    this.router.navigate([`/events/${this.event.id}/participants/${participantId}`]);
  }

  public addParticipant() {
    this.router.navigate([`/events/${this.event.id}/participants/new`]);
  }

  private init(eventId: number) {
    Promise.all([
      this.eventsHttp.getEvent(eventId),
      this.eventParticipantsHttp.getAllEventParticipants(eventId)
    ]).then(it => {
      this.event = it[0];
      this.participants = it[1];

      this.loadingInProgress = false;
    })
  }

  private parseParams(action: (number) => void) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      action(Number(id));
    });
  }
}

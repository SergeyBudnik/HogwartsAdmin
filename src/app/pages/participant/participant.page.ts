import {TranslatableComponent} from '../../translation/translation.component';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventParticipantsService, LoginService, StudentsService} from '../../service';
import {EventParticipant, EventParticipantStatus} from '../../data';
import {TranslateService} from '@ngx-translate/core';
import {EventParticipantsHttp} from '../../http';
import {Student} from '../../data/student';

@Component({
  selector: 'app-participant-page',
  templateUrl: './participant.page.html',
  styleUrls: ['./participant.page.less']
})
export class ParticipantPageComponent extends TranslatableComponent {
  public loadingInProgress = true;
  public participant: EventParticipant = null;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private studentsService: StudentsService,
    private eventParticipantsHttp: EventParticipantsHttp,
    private eventParticipantsService: EventParticipantsService,
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
      this.parseParams((participantId, eventId) => this.init(participantId, eventId));
    }
  }

  public onStatusChange(status: EventParticipantStatus) {
    this.participant.status = status;
  }

  public save() {
    this.loadingInProgress = true;

    if (!!this.participant.id) {
      this.eventParticipantsHttp
        .updateParticipant(this.participant)
        .then(() => this.loadingInProgress = false);
    } else {
      this.eventParticipantsHttp
        .createParticipant(this.participant)
        .then((eventParticipantId) => this.router.navigate([`/events/${this.participant.eventId}/participants/${eventParticipantId}`]));
    }
  }

  public delete() {
    this.loadingInProgress = true;

    this.eventParticipantsHttp
      .deleteParticipant(this.participant.id)
      .then(() => this.router.navigate([`/events/${this.participant.eventId}/information`]));
  }

  public enlisted() {
    this.loadingInProgress = true;

    this.studentsService.createStudent(new Student(
      null,
      [],
      this.participant.name,
      'AWAITING_GROUP',
      [],
      [this.participant.phone],
      'UNKNOWN',
      'UNKNOWN',
      this.participant.referralSource
    )).then(it => {
      this.loadingInProgress = false;

      this.router.navigate([`/students/${it}/information`]);
    });
  }

  private init(participantId: number, eventId: number) {
    if (participantId == null) {
      this.participant = new EventParticipant(eventId);

      this.loadingInProgress = false;
    } else {
      this.eventParticipantsService
        .getParticipant(participantId)
        .then(participant => {
          this.loadingInProgress = false;
          this.participant = participant;
        });
    }
  }

  private parseParams(onParticipant: (participantId: number, eventId: number) => any) {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      const participantId = params.get('participantId');

      if (participantId === 'new') {
        onParticipant(null, Number(eventId));
      } else {
        onParticipant(Number(participantId), Number(eventId));
      }
    });
  }
}

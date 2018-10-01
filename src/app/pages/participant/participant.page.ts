import {TranslatableComponent} from '../../translation/translation.component';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventParticipantsService, LoginService} from '../../service';
import {EventParticipant} from '../../data';
import {TranslateService} from '@ngx-translate/core';

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
      this.parseParams((participantId) => this.init(participantId));
    }
  }

  private init(participantId: number) {
    if (participantId == null) {
      this.participant = new EventParticipant();
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

  private parseParams(onParticipant: (participantId: number) => any) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('participantId');

      if (id === 'new') {
        onParticipant(null);
      } else {
        onParticipant(Number(id));
      }
    });
  }
}

import {Component, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventParticipantsService, EventsService, LoginService} from '../../../service';
import {ToastsManager} from 'ng2-toastr';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Event, EventParticipant} from '../../../data';

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
    private eventService: EventsService,
    private eventParticipantsService: EventParticipantsService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.parseParams((eventId) => this.init(eventId));
    }
  }

  private init(eventId: number) {
    Promise.all([
      this.eventService.getEvent(eventId),
      this.eventParticipantsService.getAllEventParticipants(eventId)
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

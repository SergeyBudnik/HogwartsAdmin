import {TranslatableComponent} from '../../translation/translation.component';
import {Component} from '@angular/core';
import {CabinetsService, LoginService, EventsService, TeachersService} from '../../service';
import {Router} from '@angular/router';
import {Cabinet, Event, Teacher} from '../../data';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.less']
})
export class EventsListPageComponent extends TranslatableComponent {
  public allEvents: Array<Event> = [];

  private allTeachers: Array<Teacher> = [];
  private allCabinets: Array<Cabinet> = [];

  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private eventsService: EventsService,
    private teachersService: TeachersService,
    private cabinetsService: CabinetsService,
    private translateService: TranslateService
  ) {
    super();

    this.translateService.setDefaultLang('ru');
    this.translateService.use('ru');

    this.translateService.setTranslation('ru', {
      LESSON_PENDING: 'Состоится',

      EVENT_TYPE_SPEAKING_CLUB: 'Speaking club'
    });

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      Promise.all([
        this.eventsService.getAllEvents(),
        this.teachersService.getAllTeachers(),
        this.cabinetsService.getAllCabinets()
      ])
      .then(it => {
        this.allEvents = it[0];
        this.allTeachers = it[1];
        this.allCabinets = it[2];

        this.loadingInProgress = false;
      });
    }
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

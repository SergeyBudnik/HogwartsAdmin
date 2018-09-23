import {Event} from '../data';
import {Injectable} from '@angular/core';
import {EventsHttp} from '../http';

@Injectable()
export class EventsService {
  public constructor(
    private eventsHttp: EventsHttp
  ) {}

  public getAllEvents(): Promise<Array<Event>> {
    return this.eventsHttp.getAllEvents();
  }

  public getEvent(id: number): Promise<Event> {
    return this.eventsHttp.getEvent(id);
  }

  public createEvent(event: Event): Promise<number> {
    return this.eventsHttp.createEvent(event);
  }

  public editEvent(event: Event): Promise<void> {
    return this.eventsHttp.editEvent(event);
  }

  public deleteEvent(id: number): Promise<void> {
    return this.eventsHttp.deleteEvent(id);
  }
}

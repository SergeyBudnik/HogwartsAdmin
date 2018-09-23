import {Injectable} from '@angular/core';
import {EventParticipant} from '../data';
import {EventParticipantsHttp} from '../http';

@Injectable()
export class EventParticipantsService {
  public constructor(
    private eventParticipantsHttp: EventParticipantsHttp
  ) {}

  public getAllEventParticipants(eventId: number): Promise<Array<EventParticipant>> {
    return this.eventParticipantsHttp.getAllEventParticipants(eventId);
  }
}

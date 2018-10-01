import {Injectable} from '@angular/core';
import {EventParticipant} from '../data';
import {EventParticipantsHttp} from '../http';

@Injectable()
export class EventParticipantsService {
  public constructor(
    private eventParticipantsHttp: EventParticipantsHttp
  ) {}

  public getAllParticipants(): Promise<Array<EventParticipant>> {
    return this.eventParticipantsHttp.getAllParticipants();
  }

  public getParticipant(eventParticipantId: number): Promise<EventParticipant> {
    return this.eventParticipantsHttp.getParticipant(eventParticipantId);
  }

  public getAllEventParticipants(eventId: number): Promise<Array<EventParticipant>> {
    return this.eventParticipantsHttp.getAllEventParticipants(eventId);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';
import {EventParticipant} from '../data/event-participant';

@Injectable()
export class EventParticipantsHttp {
  private root = `${HttpConfig.getBackendRoot()}/event-participants`;

  public constructor(private http: HttpClient) {}

  public getAllEventParticipants(eventId: number): Promise<Array<EventParticipant>> {
    return this.http.get<Array<EventParticipant>>(`${this.root}/${eventId}`).toPromise();
  }
}

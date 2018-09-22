import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';
import {Event} from '../data';

@Injectable()
export class EventsHttp {
  private root = `${HttpConfig.getBackendRoot()}/events`;

  public constructor(private http: HttpClient) {}

  public getAllEvents(): Promise<Array<Event>> {
    return this.http.get<Array<Event>>(this.root).toPromise();
  }

  public getEvent(id: number): Promise<Event> {
    return this.http.get<Event>(`${this.root}/${id}`).toPromise();
  }

  public createEvent(event: Event): Promise<number> {
    return this.http.post(`${this.root}`, event).toPromise().then(it => Number(it));
  }

  public editEvent(event: Event): Promise<void> {
    return this.http.put(`${this.root}`, event).toPromise().then(() => {});
  }

  public deleteEvent(id: number): Promise<void> {
    return this.http.delete(`${this.root}/${id}`).toPromise().then(() => {});
  }
}

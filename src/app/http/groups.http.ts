import {Injectable} from '@angular/core';
import {Group} from '../data';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';

@Injectable()
export class GroupsHttp {
  private root = `${HttpConfig.getBackendRoot()}/groups`;

  public constructor(
    private http: HttpClient
  ) {}

  public getAllGroups(): Promise<Array<Group>> {
    return this.http.get<Array<Group>>(this.root).toPromise();
  }

  public getGroup(groupId: number): Promise<Group> {
    return this.http.get<Group>(`${this.root}/${groupId}`).toPromise();
  }

  public createGroup(group: Group): Promise<number> {
    return this.http.post(`${this.root}`, group).toPromise().then(it => Number(it));
  }

  public editGroup(group: Group): Promise<void> {
    return this.http.put(`${this.root}`, group).toPromise().then(() => {});
  }

  public deleteGroup(groupId: number): Promise<void> {
    return this.http.delete(`${this.root}/${groupId}`).toPromise().then(() => {});
  }
}

import {Injectable} from '@angular/core';
import {StaffMember} from '../data';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';

@Injectable()
export class StaffMembersHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/staff/member/management`;

  public constructor(
    readonly http: HttpClient
  ) {}

  public getAllStaffMembers(): Promise<Array<StaffMember>> {
    return this.http.get<Array<StaffMember>>(this.root).toPromise();
  }

  public getStaffMember(login: String): Promise<StaffMember> {
    return this.http.get<StaffMember>(`${this.root}/${login}`).toPromise();
  }

  public createStaffMember(staffMember: StaffMember): Promise<void> {
    return this.http.post(`${this.root}`, staffMember).toPromise().then(() => {});
  }

  public editStaffMember(staffMember: StaffMember): Promise<void> {
    return this.http.put(`${this.root}`, staffMember).toPromise().then(() => {});
  }

  public deleteStaffMember(login: String): Promise<void> {
    return this.http.delete(`${this.root}/${login}`).toPromise().then(() => {});
  }
}

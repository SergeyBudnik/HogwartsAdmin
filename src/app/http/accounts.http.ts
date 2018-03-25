import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountsHttp {
  private root = `http://34.216.34.197:8080/MunicipaliSecurityServer/admin`;

  public constructor(
    private http: HttpClient
  ) {}

  public getAllAccounts(): Promise<Array<Account>> {
    return this.http.get<Array<Account>>(this.root).toPromise();
  }
}

import {AccountsHttp} from '../http/accounts.http';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountsService {
  public constructor(
    private accountsHttp: AccountsHttp
  ) {}

  public getAllAccounts(): Promise<Array<Account>> {
    return this.accountsHttp.getAllAccounts();
  }
}

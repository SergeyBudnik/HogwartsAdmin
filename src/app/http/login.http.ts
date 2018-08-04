import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpConfig} from './http-config';

class Credentials {
  public constructor(
    public login: string,
    public password: string
  ) {}
}

class AuthInfo {
  public constructor(
    public token: string,
    public validTill: number
  ) {}
}

@Injectable()
export class LoginHttp {
  private root = `${HttpConfig.getBackendRoot()}/login`;

  public constructor(
    private http: HttpClient
  ) {}

  public login(login: string, password: string): Promise<string> {
    return this.http
      .post<AuthInfo>(this.root, new Credentials(login, password))
      .toPromise()
      .then(it => it.token);
  }
}

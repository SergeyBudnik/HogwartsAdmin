import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  private root = `http://34.216.34.197:8080/HogwartsAPI/login`;

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

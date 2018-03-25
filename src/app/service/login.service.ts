import {Injectable} from '@angular/core';
import {LoginHttp} from '../http';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class LoginService {
  private authTokenKey = 'hogwartsAdminAuthToken';

  private authToken: string;

  public constructor(
    private loginHttp: LoginHttp,
    private cookieService: CookieService
  ) {}

  public login(login: string, password: string): Promise<string> {
    return this.loginHttp
      .login(login, password)
      .then(authToken => {
        this.authToken = authToken;

        this.cookieService.put(this.authTokenKey, this.authToken);

        return this.authToken;
      });
  }

  public logOff(): void {
    this.clearAuthToken();
  }

  public getAuthToken(): string {
    if (!this.authToken) {
      this.authToken = this.cookieService.get(this.authTokenKey);
    }

    return this.authToken;
  }

  public clearAuthToken(): void {
    this.authToken = null;
    this.cookieService.remove(this.authTokenKey);
  }
}

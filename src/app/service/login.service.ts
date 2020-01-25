import {Injectable} from '@angular/core';
import {LoginHttp} from '../http';
  import {CookieService} from 'angular2-cookie/core';
import {NavigationService} from './navigation/navigation.service';

@Injectable()
export class LoginService { // todo: rename to AuthService
  private authTokenKey = 'hogwartsAdminAuthToken';

  private authToken: string;

  public constructor(
    private navigationService: NavigationService,
    private loginHttp: LoginHttp,
    private cookieService: CookieService
  ) {}

  public ifAuthenticated(action: () => any) {
    if (!this.getAuthToken()) {
      this.navigationService.login().go();
    } else {
      action();
    }
  }

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

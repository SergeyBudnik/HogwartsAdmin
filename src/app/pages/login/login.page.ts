import {Component} from '@angular/core';
import {LoginService, NavigationService} from '../../service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less']
})
export class LoginPageComponent {
  public loginFailed = false;

  public login: string = '';
  public password: string = '';

  public actionInProgress = false;

  public constructor(
    private navigationService: NavigationService,
    private loginService: LoginService
  ) {
    if (!!loginService.getAuthToken()) {
      this.navigationService.students().list().go();
    }
  }

  public runLogin(): void {
    this.loginFailed = false;
    this.actionInProgress = true;

    this.loginService
      .login(this.login, this.password)
      .then(() => {
        this.navigationService.students().list().go();
        this.actionInProgress = false;
      })
      .catch(() => {
        this.loginFailed = true;
        this.actionInProgress = false;
      });
  }
}

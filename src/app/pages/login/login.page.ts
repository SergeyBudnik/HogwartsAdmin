import {TranslatableComponent} from '../../translation/translation.component';
import {Component} from '@angular/core';
import {LoginService} from '../../service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less']
})
export class LoginPageComponent extends TranslatableComponent {
  public loginFailed = false;

  public login: string;
  public password: string;

  public actionInProgress = false;

  public constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    super();

    if (!!loginService.getAuthToken()) {
      this.router.navigate([`/students`]);
    }
  }

  public runLogin(): void {
    this.loginFailed = false;
    this.actionInProgress = true;

    this.loginService
      .login(this.login, this.password)
      .then(() => {
        this.router.navigate([`/students`]);
        this.actionInProgress = false;
      })
      .catch(() => {
        this.loginFailed = true;
        this.actionInProgress = false;
      });
  }
}

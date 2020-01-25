import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService, NavigationService} from '../service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private navigationService: NavigationService,
    private loginService: LoginService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.loginService.getAuthToken();

    const authReq = !!authToken ?
      req.clone({ headers: req.headers.set('Authorization', this.loginService.getAuthToken())}) :
      req;

    return next.handle(authReq)
      .catch((error) => {
        if (error.status === 401 || error.status == 403) {
          this.navigationService.login().go();

          this.loginService.clearAuthToken();
        }

        return Observable.throw(error);
      }) as any;
  }
}

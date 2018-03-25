import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.loginService.getAuthToken();

    const authReq = !!authToken ?
      req.clone({ headers: req.headers.set('Authorization', this.loginService.getAuthToken())}) :
      req;

    return next.handle(authReq)
      .catch((error) => {
        this.router.navigate([`/login`]);

        this.loginService.clearAuthToken();

        return Observable.throw(error);
      }) as any;
  }
}

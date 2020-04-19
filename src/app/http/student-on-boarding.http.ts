import {HttpConfig} from './http-config';
import {HttpClient} from '@angular/common/http';
import {ExistingStudentOnBoarding, NewStudentOnBoarding, NewStudentOnBoardingAction, StudentOnBoardingInfo} from '../data';
import {Injectable} from '@angular/core';

@Injectable()
export class StudentOnBoardingHttp {
  private root = `${HttpConfig.getBackendRoot()}/admin/student/on-boarding`;

  public constructor(
    private http: HttpClient
  ) {}

  public getAll(): Promise<Array<ExistingStudentOnBoarding>> {
    return this.http
      .get<Array<ExistingStudentOnBoarding>>(`${this.root}/all`)
      .toPromise();
  }

  public getByLogin(login: string): Promise<ExistingStudentOnBoarding> {
    return this.http
      .get<ExistingStudentOnBoarding>(`${this.root}/login/${login}`)
      .toPromise();
  }

  public create(newStudentOnBoarding: NewStudentOnBoarding): Promise<void> {
    return this.http
      .post(`${this.root}`, newStudentOnBoarding)
      .toPromise()
      .then(() => {});
  }

  public update(login: string, studentOnBoardingInfo: StudentOnBoardingInfo): Promise<void> {
    return this.http
      .put(`${this.root}/${login}/update`, studentOnBoardingInfo)
      .toPromise()
      .then(() => {});
  }

  public completeAction(login: string, newStudentOnBoardingAction: NewStudentOnBoardingAction): Promise<void> {
    return this.http
      .put(`${this.root}/${login}/complete/action`, newStudentOnBoardingAction)
      .toPromise()
      .then(() => {});
  }

  public delete(login: string): Promise<void> {
    return this.http
      .delete(`${this.root}/${login}`)
      .toPromise()
      .then(() => {});
  }
}

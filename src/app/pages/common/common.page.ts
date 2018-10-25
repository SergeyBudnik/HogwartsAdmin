import {LoginService} from '../../service';
import {Router} from '@angular/router';

export class CommonPage {
  private aRouter: Router;

  public doInit(router: Router) {
    this.aRouter = router;
  }

  public doLogin(
    loginService: LoginService,
    action: () => any
  ) {
    if (!loginService.getAuthToken()) {
      this.aRouter.navigate([`/login`]).then(() => {});
    } else {
      action();
    }
  }

  public goToNewStudentPage() {
    this.aRouter.navigate([`/students/new/information`])
  }

  public goToStudentPage(studentId: number) {
    this.aRouter.navigate([`/students/${studentId}/information`])
  }

  public goToGroupInformationPage(groupId: number) {
    this.aRouter.navigate([`/groups/${groupId}/information`]);
  }

  public goToNewCabinetPage() {
    this.aRouter.navigate([`/cabinets/new/information`]);
  }

  public goToCabinetPage(cabinetId: number) {
    this.aRouter.navigate([`/cabinets/${cabinetId}/information`]);
  }
}

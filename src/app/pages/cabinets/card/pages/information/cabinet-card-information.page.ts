import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentsService, LoginService, NavigationService, TranslationService} from '../../../../../service';
import {Cabinet, Group, Student} from '../../../../../data';
import {CabinetsHttp, GroupsHttp} from '../../../../../http';

@Component({
  selector: 'app-cabinet-card-information-page',
  templateUrl: './cabinet-card-information.page.html',
  styleUrls: ['./cabinet-card-information.page.less']
})
export class CabinetInformationPage {
  public cabinet: Cabinet = new Cabinet(null, null);
  public groups: Array<Group> = [];
  public students: Array<Student> = [];

  public actionInProgress = false;
  public loadingInProgress = true;

  public constructor(
    private translationService: TranslationService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cabinetsHttp: CabinetsHttp,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
  ) {
    this.loginService.ifAuthenticated(() => {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id === 'new') {
          this.loadingInProgress = false;
        } else {
          this.cabinet.id = Number(id);

          this.initCabinet();
        }
      });
    });
  }

  public save(): void {
    this.actionInProgress = true;

    if (!!this.cabinet.id) {
      this.cabinetsHttp
        .editCabinet(this.cabinet)
        .then(() => this.actionInProgress = false);
    } else {
      this.cabinetsHttp
        .createCabinet(this.cabinet)
        .then(it => {
          this.actionInProgress = false;
          this.navigationService.cabinets().id(it).go();
        });
    }
  }

  public delete(): void {
    this.actionInProgress = true;

    this.cabinetsHttp
      .deleteCabinet(this.cabinet.id)
      .then(() => {
        this.actionInProgress = false;
        this.navigationService.cabinets().list();
      });
  }

  private initCabinet(): void {
    Promise.all([
      this.cabinetsHttp.getCabinet(this.cabinet.id),
      this.groupsHttp.getAllGroups(),
      this.studentsService.getAllStudents()
    ]).then(it => {
      this.cabinet = it[0];
      this.groups = it[1];
      this.students = it[2];

      this.loadingInProgress = false;
    });
  }
}

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentsService, LoginService, NavigationService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Group, Student, Cabinet, CabinetTypeUtils} from '../../../data';
import {CabinetsHttp, GroupsHttp} from '../../../http';
import {SelectItem} from '../../../controls/select-item';

@Component({
  selector: 'app-cabinet-information-page',
  templateUrl: './cabinet-information.page.html',
  styleUrls: ['./cabinet-information.page.less']
})
export class CabinetInformationPageComponent extends TranslatableComponent {
  public cabinetTypes: Array<SelectItem> = CabinetTypeUtils.values.map(it => new SelectItem(this.getCabinetTypeTranslation(it), it));

  public cabinet: Cabinet = new Cabinet(null, null, null);
  public groups: Array<Group> = [];
  public students: Array<Student> = [];

  public actionInProgress = false;
  public loadingInProgress = true;

  public constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cabinetsHttp: CabinetsHttp,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
  ) {
    super();

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

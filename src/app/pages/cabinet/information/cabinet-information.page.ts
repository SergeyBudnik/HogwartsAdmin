import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService, LoginService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Group, Student, Cabinet, CabinetType, CabinetTypeUtils} from '../../../data';
import {CabinetsHttp, GroupsHttp} from '../../../http';

@Component({
  selector: 'app-cabinet-information-page',
  templateUrl: './cabinet-information.page.html',
  styleUrls: ['./cabinet-information.page.less']
})
export class CabinetInformationPageComponent extends TranslatableComponent {
  public cabinetTypes: Array<CabinetType> = CabinetTypeUtils.values;

  public cabinet: Cabinet = new Cabinet(null, null, null);
  public groups: Array<Group> = [];
  public students: Array<Student> = [];

  public actionInProgress = false;
  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cabinetsHttp: CabinetsHttp,
    private groupsHttp: GroupsHttp,
    private studentsService: StudentsService,
  ) {
    super();

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id === 'new') {
          this.loadingInProgress = false;
        } else {
          this.cabinet.id = Number(id);

          this.initCabinet();
        }
      });
    }
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
          this.router.navigate([`/cabinets/${it}/information`]);
        });
    }
  }

  public delete(): void {
    this.actionInProgress = true;

    this.cabinetsHttp
      .deleteCabinet(this.cabinet.id)
      .then(() => {
        this.actionInProgress = false;
        this.router.navigate([`/cabinets`]);
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

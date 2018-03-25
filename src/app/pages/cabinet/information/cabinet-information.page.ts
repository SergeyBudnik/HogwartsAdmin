import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonsService, StudentsService, CabinetsService, GroupsService, LoginService} from '../../../service';
import {TranslatableComponent} from '../../../translation/translation.component';
import {Group, Lesson, Student, Cabinet, CabinetType, CabinetTypeUtils} from '../../../data';

@Component({
  selector: 'app-cabinet-information-page',
  templateUrl: './cabinet-information.page.html',
  styleUrls: ['./cabinet-information.page.less']
})
export class CabinetInformationPageComponent extends TranslatableComponent {
  public cabinetTypes: Array<CabinetType> = CabinetTypeUtils.values;

  public cabinet: Cabinet = new Cabinet(null, null, null);
  public groups: Array<Group> = [];
  public lessons: Array<Lesson> = [];
  public students: Array<Student> = [];

  public actionInProgress = false;
  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cabinetsService: CabinetsService,
    private groupsService: GroupsService,
    private studentsService: StudentsService,
    private lessonsService: LessonsService,
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
      this.cabinetsService
        .editCabinet(this.cabinet)
        .then(() => this.actionInProgress = false);
    } else {
      this.cabinetsService
        .createCabinet(this.cabinet)
        .then(it => {
          this.actionInProgress = false;
          this.router.navigate([`/cabinets/${it}/information`]);
        });
    }
  }

  public delete(): void {
    this.actionInProgress = true;

    this.cabinetsService
      .deleteCabinet(this.cabinet.id)
      .then(() => {
        this.actionInProgress = false;
        this.router.navigate([`/cabinets`]);
      });
  }

  private initCabinet(): void {
    Promise.all([
      this.cabinetsService.getCabinet(this.cabinet.id),
      this.groupsService.getAllGroups(),
      this.lessonsService.getCabinetLessons(this.cabinet.id),
      this.studentsService.getAllStudents()
    ]).then(it => {
      this.cabinet = it[0];
      this.groups = it[1];
      this.lessons = it[2];
      this.students = it[3];

      this.loadingInProgress = false;
    });
  }
}

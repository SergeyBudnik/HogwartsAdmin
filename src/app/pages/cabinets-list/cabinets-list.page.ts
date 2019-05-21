import {Component} from '@angular/core';
import {Cabinet, Group, Student, TimeUtils} from '../../data';
import {LoginService, StudentPaymentService} from '../../service';
import {Router} from '@angular/router';
import {CabinetsHttp, GroupsHttp, StudentsHttp} from '../../http';
import {CommonPage} from '../common/common.page';

@Component({
  selector: 'app-cabinets-list-page',
  templateUrl: './cabinets-list.page.html',
  styleUrls: ['./cabinets-list.page.less']
})
export class CabinetsListPageComponent extends CommonPage {
  private allGroups: Array<Group> = [];
  private allCabinets: Array<Cabinet> = [];
  private allStudents: Array<Student> = [];

  public cabinets: Array<Cabinet> = [];
  public loadingInProgress = true;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private cabinetsHttp: CabinetsHttp,
    private studentsHttp: StudentsHttp,
    private studentPaymentService: StudentPaymentService
  ) {
    super();

    const thisService = this;

    this.doInit(this.router);
    this.doLogin(this.loginService.getAuthToken(), () => thisService.init());
  }

  private init() {
    Promise.all([
      this.cabinetsHttp.getAllCabinets(),
      this.groupsHttp.getAllGroups(),
      this.studentsHttp.getAllStudents()
    ]).then(it => {
      this.allCabinets = it[0];
      this.allGroups = it[1];
      this.allStudents = it[2];

      this.cabinets = this.getFilteredCabinets('');

      this.loadingInProgress = false;
    });
  }

  public getLoad(cabinetId: number) {
    let load = 0;

    this.allGroups.filter(group => group.cabinetId === cabinetId).forEach(group => {
      group.lessons.forEach(lesson => {
        load += TimeUtils.index(lesson.finishTime) - TimeUtils.index(lesson.startTime);
      })
    });

    return load * 30;
  }

  public getIncome(cabinetId: number): number {
    let income = 0;

    this.allGroups
      .filter(group => group.cabinetId === cabinetId)
      .forEach(group => {
        income += this.studentPaymentService.getGroupPayment(group, group.lessons, this.getGroupActiveStudents(group.id));
      });

    return income;
  }

  private getGroupActiveStudents(groupId: number): Array<Student> {
    return this.allStudents
      .filter(student => !!student.studentGroups.map(it => it.groupId).find(studentGroupId => studentGroupId == groupId))
      .filter(student => student.statusType == 'STUDYING')
  }

  public onSearchChange(cabinetNameFilter: string): void {
    this.cabinets = this.getFilteredCabinets(cabinetNameFilter);
  }

  private getFilteredCabinets(cabinetNameFilter: string): Array<Cabinet> {
    return this.allCabinets
      .filter(it => it.name.toLowerCase().indexOf(cabinetNameFilter.toLowerCase()) !== -1);
  }
}

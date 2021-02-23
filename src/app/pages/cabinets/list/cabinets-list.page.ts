import {Component} from '@angular/core';
import {Cabinet} from '../../../data';
import {LoginService, NavigationService} from '../../../service';
import {CabinetsHttp, GroupsHttp} from '../../../http';

@Component({
  selector: 'app-cabinets-list-page',
  templateUrl: './cabinets-list.page.html',
  styleUrls: ['./cabinets-list.page.less']
})
export class CabinetsListPage {
  private allCabinets: Array<Cabinet> = [];

  public cabinets: Array<Cabinet> = [];
  public loadingInProgress = true;

  public constructor(
    public navigationService: NavigationService,
    private loginService: LoginService,
    private groupsHttp: GroupsHttp,
    private cabinetsHttp: CabinetsHttp
  ) {
    this.loginService.ifAuthenticated(() => {
      this.init();
    });
  }

  private init() {
    Promise.all([
      this.cabinetsHttp.getAllCabinets()
    ]).then(it => {
      this.allCabinets = it[0];

      this.cabinets = this.getFilteredCabinets('');

      this.loadingInProgress = false;
    });
  }

  public onSearchChange(cabinetNameFilter: string): void {
    this.cabinets = this.getFilteredCabinets(cabinetNameFilter);
  }

  private getFilteredCabinets(cabinetNameFilter: string): Array<Cabinet> {
    return this.allCabinets
      .filter(it => it.info.name.toLowerCase().indexOf(cabinetNameFilter.toLowerCase()) !== -1);
  }
}

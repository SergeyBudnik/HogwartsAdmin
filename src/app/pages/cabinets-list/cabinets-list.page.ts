import {Component} from '@angular/core';
import {Cabinet} from '../../data';
import {LoginService} from '../../service';
import {Router} from '@angular/router';
import {CabinetsHttp} from '../../http';

@Component({
  selector: 'app-cabinets-list-page',
  templateUrl: './cabinets-list.page.html',
  styleUrls: ['./cabinets-list.page.less']
})
export class CabinetsListPageComponent {
  public cabinets: Array<Cabinet> = [];
  public loadingInProgress = true;

  private unfilteredCabinets: Array<Cabinet> = [];

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private cabinetsHttp: CabinetsHttp
  ) {
    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.cabinetsHttp.getAllCabinets().then(it => {
        this.unfilteredCabinets = it;
        this.cabinets = this.getFilteredCabinets('');

        this.loadingInProgress = false;
      });
    }
  }

  public onSearchChange(cabinetNameFilter: string): void {
    this.cabinets = this.getFilteredCabinets(cabinetNameFilter);
  }

  public openCabinetPage(cabinetId: number) {
    this.router.navigate([`/cabinets/${cabinetId}/information`]);
  }

  public openNewCabinetPage() {
    this.router.navigate([`/cabinets/new/information`]);
  }

  private getFilteredCabinets(cabinetNameFilter: string): Array<Cabinet> {
    return this.unfilteredCabinets
      .filter(it => it.name.toLowerCase().indexOf(cabinetNameFilter.toLowerCase()) !== -1);
  }
}

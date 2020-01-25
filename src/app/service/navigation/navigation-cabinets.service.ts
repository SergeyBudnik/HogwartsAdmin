import {NavigationExecutor} from './common';
import {Router} from '@angular/router';

export class NavigationCabinetsService {
  constructor(private router: Router) {}

  public list(): NavigationExecutor {
    return new NavigationExecutor(this.router, `cabinets`);
  }

  public new(): NavigationExecutor {
    return new NavigationExecutor(this.router, `cabinets/new/information`);
  }

  public id(id: number): NavigationCabinetService {
    return new NavigationCabinetService(this.router, id);
  }
}

export class NavigationCabinetService {
  constructor(private router: Router, private id: number) {}

  public go() {
    return this.information().go();
  }

  public information(): NavigationExecutor {
    return new NavigationExecutor(this.router, `cabinets/${this.id}/information`);
  }

  public timetable(): NavigationExecutor {
    return new NavigationExecutor(this.router, `cabinets/${this.id}/timetable`);
  }
}

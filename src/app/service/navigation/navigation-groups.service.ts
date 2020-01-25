import {NavigationExecutor} from './common';
import {Router} from '@angular/router';

export class NavigationGroupsService {
  constructor(private router: Router) {}

  public list(): NavigationExecutor {
    return new NavigationExecutor(this.router, `groups`);
  }

  public new(): NavigationExecutor {
    return new NavigationExecutor(this.router, `groups/new/information`);
  }

  public id(id: number): NavigationGroupService {
    return new NavigationGroupService(this.router, id);
  }
}

export class NavigationGroupService {
  constructor(private router: Router, private id: number) {}

  public information(): NavigationExecutor {
    return new NavigationExecutor(this.router, `groups/${this.id}/information`);
  }

  public students(): NavigationExecutor {
    return new NavigationExecutor(this.router, `groups/${this.id}/students`);
  }

  public timetable(): NavigationExecutor {
    return new NavigationExecutor(this.router, `groups/${this.id}/timetable`);
  }
}

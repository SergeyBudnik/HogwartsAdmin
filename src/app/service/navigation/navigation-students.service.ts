import {NavigationExecutor} from './common';
import {Router} from '@angular/router';

export class NavigationStudentsService {
  constructor(private router: Router) {}

  public list(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students`);
  }

  public new(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/new/information`);
  }

  public newForGroup(groupId: number): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/new/information`, {queryParams: {groupId: groupId}});
  }

  public id(id: number): NavigationStudentService {
    return new NavigationStudentService(this.router, id);
  }
}

export class NavigationStudentService {
  constructor(private router: Router, private id: number) {}

  public information(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.id}/information`);
  }

  public status(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.id}/status`);
  }

  public attendance(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.id}/attendance`);
  }

  public payment(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.id}/payment`);
  }
}

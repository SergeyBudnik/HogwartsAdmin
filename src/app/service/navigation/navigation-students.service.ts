import {NavigationExecutor} from './common';
import {Router} from '@angular/router';

export class NavigationStudentsService {
  constructor(private router: Router) {}

  public list(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students`);
  }

  public new(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/new`);
  }

  public newForGroup(groupId: number): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/new`, {queryParams: {groupId: groupId}});
  }

  public newForOnBoarding(login: string): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/new`, {queryParams: {studentOnBoardingLogin: login}});
  }

  public login(login: string): NavigationStudentService {
    return new NavigationStudentService(this.router, login);
  }
}

export class NavigationStudentService {
  constructor(private router: Router, private login: string) {}

  public information(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.login}/information`);
  }

  public status(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.login}/status`);
  }

  public attendance(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.login}/attendance`);
  }

  public payment(): NavigationExecutor {
    return new NavigationExecutor(this.router, `students/${this.login}/payment`);
  }
}
